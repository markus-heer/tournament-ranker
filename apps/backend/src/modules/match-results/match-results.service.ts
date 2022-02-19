import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { MatchResult } from './models/MatchResults.model';

@Injectable()
export class MatchResultsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<MatchResult[]> {
    const matchResults = await this.prisma.matchResult.findMany();

    return matchResults.map((matchResult) => new MatchResult(matchResult));
  }

  async findManyByMatchId(id: string): Promise<MatchResult[]> {
    const matchResults = await this.prisma.matchResult.findMany({
      where: { match: { id } },
    });

    return matchResults.map((matchResult) => new MatchResult(matchResult));
  }

  async findManyByMatchIdWithPlayerENTITY(id: string) {
    const matchResults = await this.prisma.matchResult.findMany({
      where: { match: { id } },
      include: { player: true },
    });

    return matchResults;
  }

  async findManyByPlayerId(id: string): Promise<MatchResult[]> {
    const matchResults = await this.prisma.matchResult.findMany({
      where: { player: { id } },
    });

    return matchResults.map((matchResult) => new MatchResult(matchResult));
  }

  async calculateEloByPlayerId(id: string): Promise<number> {
    const matchResults = await this.prisma.matchResult.aggregate({
      where: { player: { id } },
      _sum: {
        eloChange: true,
      },
    });

    return (matchResults._sum.eloChange || 0) + 1200;
  }

  async create(data: Prisma.MatchResultCreateArgs['data']): Promise<MatchResult> {
    return new MatchResult(await this.prisma.matchResult.create({ data }));
  }

  async delete(id: string): Promise<MatchResult> {
    return new MatchResult(await this.prisma.matchResult.delete({ where: { id } }));
  }
}
