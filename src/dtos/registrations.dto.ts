import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsEnum, IsOptional, IsArray } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { Registration } from '@/interfaces/registrations.interface'

@InputType()
export class CreateRegistrationDto implements Partial<Registration> {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  @IsNotEmpty()
  phone: string

  @Field()
  @IsNotEmpty()
  fatherName: string

  @Field({ nullable: true })
  @IsOptional()
  gender?: string

  @Field({ nullable: true })
  @IsOptional()
  age?: string

  @Field({ nullable: true })
  @IsOptional()
  education?: string

  @Field({ nullable: true })
  @IsOptional()
  city?: string

  @Field({ nullable: true })
  @IsOptional()
  cnic?: string

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  courses?: string[]

  @Field({ nullable: true })
  @IsOptional()
  noticeBoard?: string

  @Field({ nullable: true })
  @IsOptional()
  trainingMode?: string

  @Field({ nullable: true })
  @IsOptional()
  heardAboutUs?: string
}

@InputType()
export class GetRegistrationDto {
  @Field()
  page: number  
  
  @Field()
  limit: number
 
  @Field({ nullable: true })
  @IsOptional()
  deleted: boolean
   
  @Field({ nullable: true })
  @IsOptional()
  approved: boolean

  @Field({ nullable: true })
  @IsOptional()
  searchFilter?: string
}

@InputType()
export class updateRegistrationDto {

  @Field({ nullable: true })
  @IsOptional()
  noticeBoard: string
}