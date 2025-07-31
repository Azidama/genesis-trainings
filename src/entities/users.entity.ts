import { IsNotEmpty } from 'class-validator'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm'
import { User, UserRole } from '@interfaces/users.interface'
import { EnrollmentEntity } from './enrollment.entity'
import { SubmissionEntity } from './submissions.entity'
import { BatchEntity } from './batches.entity'

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  @IsNotEmpty()
  @Unique(['email'])
  email: string

  @Column()
  @IsNotEmpty()
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => EnrollmentEntity, enrollment => enrollment.student)
  enrollments: EnrollmentEntity[]

  @OneToMany(() => SubmissionEntity, submission => submission.student)
  submissions: SubmissionEntity[]

  @ManyToOne(() => BatchEntity, batch => batch.students, {
    onDelete: 'SET NULL',
  })
  batch: BatchEntity;
}
