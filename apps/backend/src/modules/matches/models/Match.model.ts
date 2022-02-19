import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Match as MatchEntity } from '@prisma/client';
import { Game } from 'src/modules/games/models/Game.model';
import { MatchRanking } from 'src/modules/match-rankings/models/MatchRankings.model';

@ObjectType()
export class Match {
  @Field(() => ID)
  id: string;

  @Field(() => Game)
  game?: Game;

  @Field(() => [MatchRanking])
  matchRankings?: MatchRanking[];

  constructor({ id }: MatchEntity) {
    this.id = id;
  }
}
