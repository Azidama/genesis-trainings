import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { Course } from '@/typedefs/courses.type'

@InputType()
export class CreateCourseDto implements Partial<Course> {
  @Field()
  @IsString()
  @IsNotEmpty()
  code: string

  @Field()
  @IsString()
  @IsNotEmpty()
  title: string

  @Field()
  @IsString()
  description: string
}

// @InputType()
// export class UpdateUserDto implements Partial<User> {
//   @Field({ nullable: true })
//   @IsString()
//   @IsNotEmpty()
//   @MinLength(9)
//   @MaxLength(32)
//   password: string

//   @Field({ nullable: true })
//   @IsString()
//   firstName: string

//   @Field({ nullable: true })
//   @IsString()
//   lastName: string
// }

// @InputType()
// export class LoginUserDto implements Partial<User> {
//   @Field()
//   @IsEmail()
//   email: string

//   @Field()
//   @IsString()
//   @IsNotEmpty()
//   @MinLength(9)
//   @MaxLength(32)
//   password: string
// }
