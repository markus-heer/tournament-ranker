import { Injectable } from '@nestjs/common';
import { Game } from 'src/modules/games/models/Game.model';
import { GameCreateInput } from 'src/modules/games/models/GameCreateInput.model';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Game[]> {
    const games = await this.prisma.game.findMany();

    return games.map((game) => new Game(game));
  }

  async findByMatchId(id: string): Promise<Game> {
    const game = await this.prisma.game.findFirst({ where: { match: { some: { id } } } });

    if (!game) throw new Error('Match or Game not found');

    return new Game(game);
  }

  async create(data: GameCreateInput): Promise<Game> {
    return new Game(await this.prisma.game.create({ data }));
  }

  async delete(id: string): Promise<Game> {
    return new Game(await this.prisma.game.delete({ where: { id } }));
  }
}
