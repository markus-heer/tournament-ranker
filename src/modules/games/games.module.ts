import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { GamesResolver } from './games.resolver';
import { GamesService } from './games.service';

@Module({
  imports: [PrismaModule],
  providers: [GamesService, GamesResolver],
  exports: [GamesService],
})
export class GamesModule {}
