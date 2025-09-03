import { UserRole } from '@/interfaces/users.interface'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  email: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field(() => UserRole, { nullable: true })
  role?: UserRole

}
