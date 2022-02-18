import { Field, InputType } from '@nestjs/graphql';
import { GameType } from '@prisma/client';

@InputType()
export class GameCreateInput {
  @Field()
  name: string;

  @Field(() => GameType)
  gameType: GameType;
}
