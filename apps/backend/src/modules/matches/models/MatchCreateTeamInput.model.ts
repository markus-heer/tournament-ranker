import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TeamRanking {
  @Field(() => [ID])
  playerIds: string[];

  @Field()
  rank: number;
}

@InputType()
export class MatchCreateTeamInput {
  @Field()
  gameId: string;

  @Field(() => [TeamRanking])
  teamRankings: TeamRanking[];
}
