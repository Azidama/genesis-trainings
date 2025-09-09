import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsEnum, IsOptional, IsArray } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { UserRole } from '@/interfaces/users.interface'
import { Registration } from '@/interfaces/registrations.interface'


@InputType()
export class CreateRegistrationDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  name: string;
  
  @Field()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsNotEmpty()
  fatherName: string;

  @Field({ nullable: true })
  @IsOptional()
  gender?: string;

  @Field({ nullable: true })
  @IsOptional()
  education?: string;
  
  @Field({ nullable: true })
  @IsOptional()
  city?: string;

  @Field({ nullable: true })
  @IsOptional()
  cnic?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  courses?: string[];

  @Field({ nullable: true })
  @IsOptional()
  trainingMode?: string;

  @Field({ nullable: true })
  @IsOptional()
  heardAboutUs?: string;
}

@InputType()
export class CreateUserDto implements Partial<Registration> {
  @Field()
  @IsEmail()
  email: string

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

// @InputType()
// export class UpdateUserDto implements Partial<Registration> {
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

//   @Field(() => UserRole, {nullable: true} )
//   @IsEnum(UserRole, { message: 'Role must be admin, teacher, or student' })
//   role: UserRole
// }

@InputType()
export class LoginUserDto implements Partial<Registration> {
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
