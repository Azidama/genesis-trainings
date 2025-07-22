import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator'
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

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstName: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  lastName: string
}

@InputType()
export class UpdateUserDto implements Partial<User> {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  password: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstName: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  lastName: string
}
