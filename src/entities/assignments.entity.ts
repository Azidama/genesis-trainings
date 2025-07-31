import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Assignment } from '@/interfaces/assignments.interface'
import { CourseEntity } from './courses.entity'
import { SubmissionEntity } from './submissions.entity'

@Entity()
export class AssignmentEntity extends BaseEntity implements Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column('text')
  description: string

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date

  @ManyToOne(() => CourseEntity, course => course.assignments,
  { onDelete: 'CASCADE' }
)
  course: CourseEntity

  @OneToMany(() => SubmissionEntity, submission => submission.assignment)
  submissions: SubmissionEntity[]
}
