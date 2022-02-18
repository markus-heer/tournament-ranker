import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PlayerCreateInput {
  @Field()
  name: string;
}
