import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { validationSchema } from 'src/helpers/validation/envVarValidation';
import { GamesModule } from 'src/modules/games/games.module';
import { MatchesModule } from 'src/modules/matches/matches.module';

import { AppController } from './app.controller';
import { PlayersModule } from './modules/players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      introspection: true,
      installSubscriptionHandlers: true,
      cors: true,
    }),
    PlayersModule,
    GamesModule,
    MatchesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
