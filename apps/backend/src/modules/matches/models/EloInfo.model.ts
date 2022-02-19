import { Field, ObjectType } from '@nestjs/graphql';
import { Player } from 'src/modules/players/models/Player.model';

@ObjectType()
export class EloInfo {
  @Field(() => Player)
  player: Player;

  @Field()
  eloChange: number;
}
