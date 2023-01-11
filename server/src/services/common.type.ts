import { ObjectType, Field } from "type-graphql";
@ObjectType()
export class ResponseMessage {
  @Field()
  success?: boolean;

  @Field()
  message?: string;
}
