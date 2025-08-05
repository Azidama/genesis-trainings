import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Course {
  @Field()
  id: number

  @Field()
  code: string

  @Field({ nullable: true })
  title: string

  @Field({ nullable: true })
  description: string
}
