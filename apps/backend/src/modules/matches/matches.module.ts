import { forwardRef, Module } from '@nestjs/common';
import { GamesModule } from 'src/modules/games/games.module';
import { MatchesResolver } from 'src/modules/matches/matches.resolver';
import { MatchesService } from 'src/modules/matches/matches.service';
import { PlayersModule } from 'src/modules/players/players.module';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { MatchResultsModule } from '../match-results/match-results.module';

@Module({
  imports: [PrismaModule, PlayersModule, MatchResultsModule, forwardRef(() => GamesModule)],
  providers: [MatchesService, MatchesResolver],
  exports: [MatchesService],
})
export class MatchesModule {}
