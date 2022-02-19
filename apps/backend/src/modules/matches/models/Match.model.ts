import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Match as MatchEntity } from '@prisma/client';
import { Game } from 'src/modules/games/models/Game.model';
import { MatchResult } from 'src/modules/match-results/models/MatchResults.model';

@ObjectType()
export class Match {
  @Field(() => ID)
  id: string;

  @Field(() => Game)
  game?: Game;

  @Field(() => [MatchResult])
  matchResults?: MatchResult[];

  constructor({ id }: MatchEntity) {
    this.id = id;
  }
}
