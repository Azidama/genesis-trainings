import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsEnum } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { User } from '@typedefs/users.type'
import { UserRole } from '@/interfaces/users.interface'

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

  @Field(() => UserRole, {nullable: true} )
  @IsEnum(UserRole, { message: 'Role must be admin, teacher, or student' })
  role: UserRole
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

  @Field(() => UserRole, {nullable: true} )
  @IsEnum(UserRole, { message: 'Role must be admin, teacher, or student' })
  role: UserRole
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
