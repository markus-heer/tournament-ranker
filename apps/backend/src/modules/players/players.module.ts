import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { MatchRankingsModule } from '../match-rankings/match-rankings.module';
import { PlayersResolver } from './players.resolver';
import { PlayersService } from './players.service';

@Module({
  imports: [PrismaModule, forwardRef(() => MatchRankingsModule)],
  providers: [PlayersService, PlayersResolver],
  exports: [PlayersService],
})
export class PlayersModule {}
