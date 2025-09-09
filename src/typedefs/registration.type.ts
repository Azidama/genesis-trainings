import { Field, ObjectType } from 'type-graphql'
// import { CourseMode } from '@/interfaces/courses.interface'

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
  education?: string

  @Field()
  city?: string

  @Field()
  cnic?: string

  @Field()
  phone?: string

  @Field(() => [String], { 
    nullable: true 
  })
  courses?: string[]

  @Field()
  trainingMode?: string

  @Field()
  heardAboutUs?: string
}
