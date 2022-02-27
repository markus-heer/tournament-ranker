import { Injectable } from '@nestjs/common';
import { mean } from 'lodash';
import { MatchResultsService } from 'src/modules/match-results/match-results.service';
import {
  buildTuples,
  calculateExpectedScores,
  eloDelta,
  k,
  PlayerRankingWithElo,
  TeamRankingWithElo,
} from 'src/modules/matches/helpers/eloCalculation';
import { EloInfo } from 'src/modules/matches/models/EloInfo.model';
import { Match } from 'src/modules/matches/models/Match.model';
import { MatchCreateSingleInput } from 'src/modules/matches/models/MatchCreateSingleInput.model';
import { Player } from 'src/modules/players/models/Player.model';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { MatchCreateTeamInput } from './models/MatchCreateTeamInput.model';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService, private matchResultsService: MatchResultsService) {}

  async findAll(): Promise<Match[]> {
    const matches = await this.prisma.match.findMany({ orderBy: { createdAt: 'desc' } });

    return matches.map((match) => new Match(match));
  }

  async getEloInfo(id: string): Promise<EloInfo[]> {
    const matchResults = await this.matchResultsService.findManyByMatchIdWithPlayerENTITY(id);

    const eloSum: Record<string, number> = {};

    matchResults.forEach((matchResult) => {
      if (eloSum[matchResult.player.id]) {
        eloSum[matchResult.player.id] += matchResult.eloChange;
      } else {
        eloSum[matchResult.player.id] = matchResult.eloChange;
      }
    });

    const playerIds = Array.from(new Set(matchResults.map(({ player }) => player.id)));

    const eloInfo = playerIds
      .map(
        (playerId): EloInfo => ({
          player: new Player(
            matchResults.find(({ player }) => player.id === playerId)?.player as Player,
          ),
          eloChange: eloSum[playerId],
          rank: matchResults.find(({ player }) => player.id === playerId)?.rank || 0,
        }),
      )
      .sort((a, b) => a.rank - b.rank);

    return eloInfo;
  }

  async getNumberOfMatchesByGameId(gameId: string): Promise<number> {
    const matches = await this.prisma.match.aggregate({
      where: { gameId },
      _count: true,
    });

    return matches._count;
  }

  async createSingleMatch({ gameId, playerRankings }: MatchCreateSingleInput): Promise<Match> {
    const match = await this.prisma.match.create({ data: { gameId } });

    const rankingsWithElo: PlayerRankingWithElo[] = await Promise.all(
      playerRankings.map(async (playerRanking) => ({
        ...playerRanking,
        elo: await this.matchResultsService.calculateEloByPlayerId(playerRanking.playerId),
      })),
    );

    // Every Matchup is treated like a separate game. Like when there is a 1st, 2nd and 3rd player,
    // 1st vs 2nd, 1st vs 3rd and 2nd vs 3rd are seperately calculated rounds.
    const matchResultTuples: PlayerRankingWithElo[][] = buildTuples(rankingsWithElo);

    await Promise.all(
      matchResultTuples.map(async ([playerOne, playerTwo]) => {
        const { e1, e2 } = calculateExpectedScores(playerOne.elo, playerTwo.elo);

        // Player one can only be winner or have a deuce, as the players were sorted by winner.
        const resultPlayerOne = playerOne.rank === playerTwo.rank ? 0.5 : 1;
        const resultPlayerTwo = 1 - resultPlayerOne;

        await this.matchResultsService.create({
          rank: playerOne.rank,
          eloChange: eloDelta(k, resultPlayerOne, e1),
          playerId: playerOne.playerId,
          matchId: match.id,
        });

        await this.matchResultsService.create({
          rank: playerTwo.rank,
          eloChange: eloDelta(k, resultPlayerTwo, e2),
          playerId: playerTwo.playerId,
          matchId: match.id,
        });
      }),
    );

    return new Match(match);
  }

  async createTeamMatch({ gameId, teamRankings }: MatchCreateTeamInput): Promise<Match> {
    const match = await this.prisma.match.create({ data: { gameId } });

    const rankingsWithElo: TeamRankingWithElo[] = await Promise.all(
      teamRankings.map(async (teamRanking) => {
        const playerElos = await Promise.all(
          teamRanking.playerIds.map((playerId) =>
            this.matchResultsService.calculateEloByPlayerId(playerId),
          ),
        );
        return {
          ...teamRanking,
          avgElo: mean(playerElos),
        };
      }),
    );

    // Every Matchup is treated like a separate game. Like when there is a 1st, 2nd and 3rd team,
    // 1st vs 2nd, 1st vs 3rd and 2nd vs 3rd are seperately calculated rounds.
    const matchResultTuples: TeamRankingWithElo[][] = buildTuples(rankingsWithElo);

    await Promise.all(
      matchResultTuples.map(async ([teamOne, teamTwo]) => {
        const { e1, e2 } = calculateExpectedScores(teamOne.avgElo, teamTwo.avgElo);

        // Team one can only be winner or have a deuce, as the teams were sorted by winner.
        const resultTeamOne = teamOne.rank === teamTwo.rank ? 0.5 : 1;
        const resultTeamTwo = 1 - resultTeamOne;

        await Promise.all(
          teamOne.playerIds.map(async (playerId) =>
            this.matchResultsService.create({
              rank: teamOne.rank,
              eloChange: eloDelta(k, resultTeamOne, e1),
              playerId: playerId,
              matchId: match.id,
            }),
          ),
        );

        await Promise.all(
          teamTwo.playerIds.map(async (playerId) =>
            this.matchResultsService.create({
              rank: teamTwo.rank,
              eloChange: eloDelta(k, resultTeamTwo, e2),
              playerId: playerId,
              matchId: match.id,
            }),
          ),
        );
      }),
    );

    return new Match(match);
  }

  async delete(id: string): Promise<Match> {
    return new Match(await this.prisma.match.delete({ where: { id } }));
  }
}
