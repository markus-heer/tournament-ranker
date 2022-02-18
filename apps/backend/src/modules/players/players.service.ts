import { Injectable } from '@nestjs/common';
import { Player } from 'src/modules/players/models/Player.model';
import { PlayerCreateInput } from 'src/modules/players/models/PlayerCreateInput.model';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { PlayerUpdateInput } from './models/PlayerUpdateInput.model';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Player[]> {
    const players = await this.prisma.player.findMany();

    return players.map((player) => new Player(player));
  }

  async findPlayersByMatchId(matchId: string): Promise<Player[]> {
    const players = await this.prisma.player.findMany({
      where: { matches: { some: { matchId } } },
    });

    return players.map((player) => new Player(player));
  }

  async findWinnersByMatchId(matchId: string): Promise<Player[]> {
    const players = await this.prisma.player.findMany({
      where: { wonMatches: { some: { matchId } } },
    });

    return players.map((player) => new Player(player));
  }

  async create(data: PlayerCreateInput): Promise<Player> {
    return new Player(await this.prisma.player.create({ data }));
  }

  async update(id: string, data: PlayerUpdateInput): Promise<Player> {
    return new Player(await this.prisma.player.update({ where: { id }, data }));
  }

  async delete(id: string): Promise<Player> {
    return new Player(await this.prisma.player.delete({ where: { id } }));
  }
}
