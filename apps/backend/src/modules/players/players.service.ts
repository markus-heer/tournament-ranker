import { Injectable } from '@nestjs/common';
import { Player } from 'src/modules/players/models/Player.model';
import { PlayerCreateInput } from 'src/modules/players/models/PlayerCreateInput.model';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { MatchRankingsService } from '../match-rankings/match-rankings.service';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService, private matchRankingsService: MatchRankingsService) {}

  async findById(id: string): Promise<Player> {
    const player = await this.prisma.player.findUnique({ where: { id } });

    if (!player) {
      throw new Error('Player not found.');
    }

    return new Player(player);
  }

  async findByMatchRankingId(matchRankingId: string): Promise<Player> {
    const player = await this.prisma.player.findFirst({
      where: { matchRankings: { some: { id: matchRankingId } } },
    });

    if (!player) {
      throw new Error('Player not found.');
    }

    return new Player(player);
  }

  async findAll(): Promise<Player[]> {
    const players = await this.prisma.player.findMany();

    return players.map((player) => new Player(player));
  }

  async findPlayersByMatchRankingId(matchRankingId: string): Promise<Player[]> {
    const players = await this.prisma.player.findMany({
      where: { matchRankings: { some: { id: matchRankingId } } },
    });

    return players.map((player) => new Player(player));
  }

  async create(data: PlayerCreateInput): Promise<Player> {
    return new Player(await this.prisma.player.create({ data }));
  }

  async delete(id: string): Promise<Player> {
    return new Player(await this.prisma.player.delete({ where: { id } }));
  }

  async getElo(playerId: string): Promise<number> {
    const player = await this.findById(playerId);
    const matchRankings = await this.matchRankingsService.findManyByPlayerId(playerId);

    const elo = matchRankings.reduce((sum, { eloChange }) => sum + eloChange, player.startingElo);

    return elo;
  }
}
