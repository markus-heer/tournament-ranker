import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Match as MatchEntity } from '@prisma/client';
import { Game } from 'src/modules/games/models/Game.model';
import { MatchResult } from 'src/modules/match-results/models/MatchResults.model';
import { EloInfo } from 'src/modules/matches/models/EloInfo.model';

@ObjectType()
export class Match {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Game)
  game?: Game;

  @Field(() => [MatchResult])
  matchResults?: MatchResult[];

  @Field(() => [EloInfo])
  eloInfo?: EloInfo[];

  constructor({ id, createdAt }: MatchEntity) {
    this.id = id;
    this.createdAt = createdAt;
  }
}
