import { Injectable } from '@nestjs/common';
import { Player } from 'src/modules/players/models/Player.model';
import { PlayerCreateInput } from 'src/modules/players/models/PlayerCreateInput.model';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

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
}
