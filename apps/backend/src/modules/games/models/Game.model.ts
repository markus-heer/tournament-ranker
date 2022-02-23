import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Game as GameEntity, GameType } from '@prisma/client';

registerEnumType(GameType, {
  name: 'GameType',
});

@ObjectType()
export class Game {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  numberOfMatches?: number;

  @Field(() => GameType)
  gameType: GameType;

  constructor({ id, name, gameType }: GameEntity) {
    this.id = id;
    this.name = name;
    this.gameType = gameType;
  }
}
