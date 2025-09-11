import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique, PrimaryColumn } from 'typeorm'
import { Course } from '@/interfaces/courses.interface'
import { AssignmentEntity } from './assignments.entity'
import { EnrollmentEntity } from './enrollment.entity'

@Entity()
export class CourseEntity extends BaseEntity implements Course {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ unique: true })
  code: string

  @Column()
  title: string

  @Column({ nullable: true })
  description: string

  @OneToMany(() => AssignmentEntity, enrollment => enrollment.course)
  enrollments: EnrollmentEntity[]

  @OneToMany(() => AssignmentEntity, assignment => assignment.course)
  assignments: AssignmentEntity[]
}
