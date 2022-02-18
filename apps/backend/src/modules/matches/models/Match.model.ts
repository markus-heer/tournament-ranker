import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Match as MatchEntity } from '@prisma/client';
import { Game } from 'src/modules/games/models/Game.model';
import { Player } from 'src/modules/players/models/Player.model';

@ObjectType()
export class Match {
  @Field(() => ID)
  id: string;

  @Field(() => Game)
  game?: Game;

  @Field(() => [Player])
  players?: Player[];

  @Field(() => [Player])
  winners?: Player[];

  constructor({ id }: MatchEntity) {
    this.id = id;
  }
}
