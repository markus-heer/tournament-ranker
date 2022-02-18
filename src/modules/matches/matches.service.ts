import { Injectable } from '@nestjs/common';
import { Match } from 'src/modules/matches/models/Match.model';
import { MatchCreateInput } from 'src/modules/matches/models/MatchCreateInput.model';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Match[]> {
    const matches = await this.prisma.match.findMany();

    return matches.map((match) => new Match(match));
  }

  async create(data: MatchCreateInput): Promise<Match> {
    return new Match(await this.prisma.match.create({ data }));
  }

  async delete(id: string): Promise<Match> {
    return new Match(await this.prisma.match.delete({ where: { id } }));
  }
}
