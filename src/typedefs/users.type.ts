import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  email: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  role?: string
}
