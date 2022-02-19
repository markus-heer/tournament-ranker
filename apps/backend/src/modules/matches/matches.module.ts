import { Module } from '@nestjs/common';
import { GamesModule } from 'src/modules/games/games.module';
import { MatchesResolver } from 'src/modules/matches/matches.resolver';
import { MatchesService } from 'src/modules/matches/matches.service';
import { PlayersModule } from 'src/modules/players/players.module';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { MatchRankingsModule } from '../match-rankings/match-rankings.module';

@Module({
  imports: [PrismaModule, GamesModule, PlayersModule, MatchRankingsModule],
  providers: [MatchesService, MatchesResolver],
  exports: [MatchesService],
})
export class MatchesModule {}
