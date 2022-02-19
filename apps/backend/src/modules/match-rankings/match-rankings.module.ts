import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { PlayersModule } from '../players/players.module';
import { MatchRankingsResolver } from './match-rankings.resolver';
import { MatchRankingsService } from './match-rankings.service';

@Module({
  imports: [PrismaModule, forwardRef(() => PlayersModule)],
  providers: [MatchRankingsService, MatchRankingsResolver],
  exports: [MatchRankingsService],
})
export class MatchRankingsModule {}
