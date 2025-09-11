import { IsNotEmpty } from 'class-validator'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
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

  @Column()
  age: string
  
  @Column()
  phone: string

  @Column()
  fatherName: string

  @Column({ nullable: true })
  gender: string

  @Column({ nullable: true })
  education: string
  
  @Column({ nullable: true })
  city: string

  @Column({ unique: true, nullable: true })
  cnic: string

  @Column({ nullable: true })
  trainingMode: string

  @Column('simple-array', { nullable: true })
  courses: string[]

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @Column({ nullable: true })
  heardAboutUs: string

}
