import { IsNotEmpty } from 'class-validator'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { CourseMode } from '@/interfaces/courses.interface'
import { Application } from '@/interfaces/applications.interface'

@Entity()
export class ApplicationEntity extends BaseEntity implements Application {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  @IsNotEmpty()
  email: string

  @Column()
  name: string
  
  @Column()
  phoneNumber: string

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

  @Column({
    type: 'enum',
    enum: CourseMode,
    nullable: true
  })
  trainingMode: CourseMode

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @Column({ nullable: true })
  heardAboutUs: string

}
