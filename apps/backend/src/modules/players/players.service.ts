import { Injectable } from '@nestjs/common';
import { Player } from 'src/modules/players/models/Player.model';
import { PlayerCreateInput } from 'src/modules/players/models/PlayerCreateInput.model';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { MatchResultsService } from '../match-results/match-results.service';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService, private matchResultsService: MatchResultsService) {}

  async findById(id: string): Promise<Player> {
    const player = await this.prisma.player.findUnique({ where: { id } });

    if (!player) {
      throw new Error('Player not found.');
    }

    return new Player(player);
  }

  async findByMatchResultId(matchResultId: string): Promise<Player> {
    const player = await this.prisma.player.findFirst({
      where: { matchResults: { some: { id: matchResultId } } },
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

  async findPlayersByMatchResultId(matchResultId: string): Promise<Player[]> {
    const players = await this.prisma.player.findMany({
      where: { matchResults: { some: { id: matchResultId } } },
    });

    return players.map((player) => new Player(player));
  }

  async create(data: PlayerCreateInput): Promise<Player> {
    return new Player(await this.prisma.player.create({ data }));
  }

  async delete(id: string): Promise<Player> {
    return new Player(await this.prisma.player.delete({ where: { id } }));
  }

  async calculateElo(playerId: string): Promise<number> {
    const player = await this.findById(playerId);
    const matchResults = await this.matchResultsService.findManyByPlayerId(playerId);

    const elo = matchResults.reduce((sum, { eloChange }) => sum + eloChange, player.startingElo);

    return elo;
  }
}
