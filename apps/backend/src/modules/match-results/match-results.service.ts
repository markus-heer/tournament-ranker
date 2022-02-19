import { Injectable } from '@nestjs/common';
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

  async findManyByPlayerId(id: string): Promise<MatchResult[]> {
    const matchResults = await this.prisma.matchResult.findMany({
      where: { player: { id } },
    });

    return matchResults.map((matchResult) => new MatchResult(matchResult));
  }

  async delete(id: string): Promise<MatchResult> {
    return new MatchResult(await this.prisma.matchResult.delete({ where: { id } }));
  }
}
