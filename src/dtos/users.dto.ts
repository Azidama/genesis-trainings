import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { User } from '@typedefs/users.type'

@InputType()
export class CreateUserDto implements Partial<User> {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  password: string

  @Field()
  @IsString()
  firstName: string

  @Field()
  @IsString()
  lastName: string
}

@InputType()
export class UpdateUserDto implements Partial<User> {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  password: string

  @Field({ nullable: true })
  @IsString()
  firstName: string

  @Field({ nullable: true })
  @IsString()
  lastName: string
}

@InputType()
export class LoginUserDto implements Partial<User> {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  password: string
}
