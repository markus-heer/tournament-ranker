import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { PlayersResolver } from './players.resolver';
import { PlayersService } from './players.service';

@Module({
  imports: [PrismaModule],
  providers: [PlayersService, PlayersResolver],
  exports: [PlayersService],
})
export class PlayersModule {}
