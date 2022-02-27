import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class PlayerRanking {
  @Field(() => ID)
  playerId: string;

  @Field()
  rank: number;
}

@InputType()
export class MatchCreateSingleInput {
  @Field()
  gameId: string;

  @Field(() => [PlayerRanking])
  playerRankings: PlayerRanking[];
}
