import { IsNotEmpty } from 'class-validator'
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { Registration } from '@/interfaces/registrations.interface'

@Entity()
export class RegistrationEntity extends BaseEntity implements Registration {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  @IsNotEmpty()
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  age: string

  @Column()
  phone: string

  @Column()
  fatherName: string

  @Column({ nullable: true })
  gender: string

  @Column()
  education: string

  @Column()
  city: string

  @Column()
  cnic: string

  @Column({ nullable: true })
  trainingMode: string

  @Column('simple-array')
  courses: string[]
    
  @Column({ nullable: true })
  noticeBoard: string

  @Column({ default: false })
  approved: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date

  @Column({ nullable: true })
  heardAboutUs: string

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date
}
