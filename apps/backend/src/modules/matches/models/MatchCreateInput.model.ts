import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MatchCreateInput {
  @Field()
  name: string;

  @Field()
  gameId: string;

  @Field(() => [String])
  playerIds?: string[];

  @Field(() => [String])
  winnerIds?: string[];
}
