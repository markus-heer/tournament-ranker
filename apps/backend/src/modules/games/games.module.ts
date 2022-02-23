import { forwardRef, Module } from '@nestjs/common';
import { MatchesModule } from 'src/modules/matches/matches.module';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { GamesResolver } from './games.resolver';
import { GamesService } from './games.service';

@Module({
  imports: [PrismaModule, forwardRef(() => MatchesModule)],
  providers: [GamesService, GamesResolver],
  exports: [GamesService],
})
export class GamesModule {}
