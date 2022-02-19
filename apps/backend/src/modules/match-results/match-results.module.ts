import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { PlayersModule } from '../players/players.module';
import { MatchResultsResolver } from './match-results.resolver';
import { MatchResultsService } from './match-results.service';

@Module({
  imports: [PrismaModule, forwardRef(() => PlayersModule)],
  providers: [MatchResultsService, MatchResultsResolver],
  exports: [MatchResultsService],
})
export class MatchResultsModule {}
