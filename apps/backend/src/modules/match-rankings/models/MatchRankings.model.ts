import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MatchRanking as MatchRankingEntity } from '@prisma/client';
import { Match } from 'src/modules/matches/models/Match.model';
import { Player } from 'src/modules/players/models/Player.model';

@ObjectType()
export class MatchRanking {
  @Field(() => ID)
  id: string;

  @Field()
  rank: number;

  @Field(() => Number)
  eloChange: number;

  @Field(() => Player)
  player?: Player;

  @Field(() => Match)
  match?: Match;

  constructor({ id, rank, eloChange }: MatchRankingEntity) {
    this.id = id;
    this.rank = rank;
    this.eloChange = eloChange;
  }
}
