import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { MatchResultsModule } from '../match-results/match-results.module';
import { PlayersResolver } from './players.resolver';
import { PlayersService } from './players.service';

@Module({
  imports: [PrismaModule, forwardRef(() => MatchResultsModule)],
  providers: [PlayersService, PlayersResolver],
  exports: [PlayersService],
})
export class PlayersModule {}
