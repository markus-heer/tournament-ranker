import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { MatchRanking } from './models/MatchRankings.model';

@Injectable()
export class MatchRankingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<MatchRanking[]> {
    const matchRankings = await this.prisma.matchRanking.findMany();

    return matchRankings.map((matchRanking) => new MatchRanking(matchRanking));
  }

  async findManyByMatchId(id: string): Promise<MatchRanking[]> {
    const matchRankings = await this.prisma.matchRanking.findMany({
      where: { match: { id } },
    });

    return matchRankings.map((matchRanking) => new MatchRanking(matchRanking));
  }

  async findManyByPlayerId(id: string): Promise<MatchRanking[]> {
    const matchRankings = await this.prisma.matchRanking.findMany({
      where: { player: { id } },
    });

    return matchRankings.map((matchRanking) => new MatchRanking(matchRanking));
  }

  async delete(id: string): Promise<MatchRanking> {
    return new MatchRanking(await this.prisma.matchRanking.delete({ where: { id } }));
  }
}
