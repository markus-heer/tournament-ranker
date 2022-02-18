import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Player as PlayerEntity } from '@prisma/client';

@ObjectType()
export class Player {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  elo: number;

  constructor({ id, name, elo }: PlayerEntity) {
    this.id = id;
    this.name = name;
    this.elo = elo;
  }
}
