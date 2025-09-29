import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Registration {
  @Field()
  id: string

  @Field()
  email: string

  @Field()
  name?: string

  @Field()
  gender?: string
  
  @Field()
  age?: string

  @Field()
  education?: string

  @Field()
  city?: string

  @Field()
  cnic?: string

  @Field()
  phone?: string

  @Field()
  hasPaid?: boolean

  @Field(() => [String], {
    nullable: true,
  })
  courses?: string[]

  @Field()
  trainingMode?: string

  @Field()
  heardAboutUs?: string
  
  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  deletedAt?: Date

}
