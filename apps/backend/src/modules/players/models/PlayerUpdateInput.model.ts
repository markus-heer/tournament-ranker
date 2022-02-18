import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PlayerUpdateInput {
  @Field()
  name: string;
}
