import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsEnum } from 'class-validator'
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
  // @MinLength(9)
  // @MaxLength(32)
  password: string

  @Field()
  @IsString()
  name: string
  
  @Field({ nullable: true })
  @IsString()
  phone: string

  @Field({ nullable: true })
  @IsString()
  role: string
}

@InputType()
export class UpdateUserDto implements Partial<User> {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  // @MinLength(9)
  // @MaxLength(32)
  password: string

  @Field({ nullable: true })
  @IsString()
  name: string

  @Field({ nullable: true })
  @IsString()
  role: string
}

@InputType()
export class LoginUserDto implements Partial<User> {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  @IsNotEmpty()
  // @MinLength(9)
  // @MaxLength(32)
  password: string
}

@InputType()
export class ResetPasswordDto {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  // @MinLength(9)
  // @MaxLength(32)
  password: string

  @Field()
  @IsString()
  token: string
}