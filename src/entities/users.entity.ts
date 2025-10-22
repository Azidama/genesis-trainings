import { IsNotEmpty } from 'class-validator'
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Relation,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import { User, UserRole } from '@interfaces/users.interface'
import { EnrollmentEntity } from './enrollment.entity'
import { SubmissionEntity } from './submissions.entity'
import { BatchEntity } from './batches.entity'
import { hash } from 'bcrypt'

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  @IsNotEmpty()
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  fatherName: string

  @Column({ nullable: true })
  phone: string

  @Column({ default: UserRole.STUDENT })
  role: string

  @Column()
  password: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => EnrollmentEntity, enrollment => enrollment.student, { nullable: true })
  enrollments: Relation<EnrollmentEntity>[]

  @OneToMany(() => SubmissionEntity, submission => submission.student, { nullable: true })
  submissions: Relation<SubmissionEntity>[]

  @ManyToOne(() => BatchEntity, batch => batch.student)
  @JoinColumn({ name: 'batchId' })
  batch: Relation<BatchEntity>

  @Column({ nullable: true })
  @Unique(['batchId'])
  batchId: string

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
        this.password = await hash(this.password, 10)
    }
  }
}
