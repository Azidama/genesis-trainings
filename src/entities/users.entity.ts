import { IsNotEmpty } from 'class-validator'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { User, UserRole } from '@interfaces/users.interface'
import { EnrollmentEntity } from './enrollment.entity'
import { SubmissionEntity } from './submissions.entity'
import { BatchEntity } from './batches.entity'

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  @IsNotEmpty()
  email: string

  @Column()
  name: string

  @Column()
  fatherName: string

  @Column({ nullable: true })
  phone: string
  
  @Column({ default: UserRole.STUDENT })
  role: string

  @Column()
  password: string

  @Column({ nullable: true })
  trainingMode: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => EnrollmentEntity, enrollment => enrollment.student, { nullable: true })
  enrollments: EnrollmentEntity[]

  @OneToMany(() => SubmissionEntity, submission => submission.student, { nullable: true })
  submissions: SubmissionEntity[]

  @ManyToOne(() => BatchEntity, batch => batch.student)
  @JoinColumn({ name: 'batchId' })
  batch: BatchEntity;

  @Column({ nullable: true })
  @Unique(['batchId']) 
  batchId: string;

}
