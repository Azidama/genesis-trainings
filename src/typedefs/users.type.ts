import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  id?: string

  @Field()
  email?: string

  @Field()
  password: string

  @Field()
  firstName?: string

  @Field()
  lastName?: string
}
