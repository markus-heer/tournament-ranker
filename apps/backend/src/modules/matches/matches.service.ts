import { Injectable } from '@nestjs/common';
import { Match } from 'src/modules/matches/models/Match.model';
import {
  MatchCreateInput,
  PlayerRanking,
} from 'src/modules/matches/models/MatchCreateInput.model';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { PlayersService } from '../players/players.service';

// https://de.wikipedia.org/wiki/Elo-Zahl#Anpassung_der_Elo-Zahl
enum Result {
  WIN = 1,
  DEUCE = 0.5,
  LOSS = 0,
}

// https://de.wikipedia.org/wiki/Elo-Zahl#Anpassung_der_Elo-Zahl
const newElo = (previousElo: number, k: 40 | 20 | 10, result: Result, expectedScore: number) =>
  Math.round(previousElo + k * (result - expectedScore));

// https://de.wikipedia.org/wiki/Elo-Zahl#Erwartungswert
const calculateExpectedScores = (elo1: number, elo2: number) => {
  const e1 = 1 / (1 + 10 ** ((elo2 - elo1) / 400));

  return { e1, e2: 1 - e1 };
};

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService, private playerService: PlayersService) {}

  async findAll(): Promise<Match[]> {
    const matches = await this.prisma.match.findMany();

    const rankings: PlayerRanking[] = [
      { playerId: 'Marco', rank: 2 },
      { playerId: 'Peter', rank: 1 },
    ];
    // TODO: Permutation
    const matchResultPair: PlayerRanking[] = rankings;

    const orderedResults: PlayerRanking[] = matchResultPair.sort((a, b) => a.rank - b.rank);

    if (orderedResults[0].rank === orderedResults[1].rank) {
      // TODO: Remis
    } else {
      const previousWinnerElo = await this.playerService.calculateElo(orderedResults[0].playerId);
      const previousloserElo = await this.playerService.calculateElo(orderedResults[1].playerId);

      const { e1, e2 } = calculateExpectedScores(previousWinnerElo, previousloserElo);

      console.log({
        previousWinnerElo,
        previousloserElo,
        winnerElo: newElo(previousWinnerElo, 40, 1, e1),
        loserElo: newElo(previousloserElo, 40, 0, e2),
      });
    }

    return matches.map((match) => new Match(match));
  }

  async create(data: MatchCreateInput): Promise<Match> {
    // TODO: Mindestens 2 rankings

    return new Match(await this.prisma.match.create({ data }));
  }

  async delete(id: string): Promise<Match> {
    return new Match(await this.prisma.match.delete({ where: { id } }));
  }
}
