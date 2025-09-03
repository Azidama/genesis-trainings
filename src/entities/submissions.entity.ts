import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm'
import { UserEntity } from './users.entity'
import { AssignmentEntity } from './assignments.entity'
import { Submission } from '@/interfaces/submissions.interface'

@Entity()
@Unique(['student', 'assignment'])
export class SubmissionEntity extends BaseEntity implements Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text', nullable: true })
  content: string

  @Column({ type: 'timestamp', nullable: true })
  submittedAt: Date

  @Column({ nullable: true })
  grade: number

  @ManyToOne(() => UserEntity, student => student.submissions,
  { onDelete: 'CASCADE' }
)
  student: UserEntity

  @ManyToOne(() => AssignmentEntity, assignment => assignment.submissions,
  { onDelete: 'CASCADE' }
)
  assignment: AssignmentEntity
}
