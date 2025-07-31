import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Course } from '@/interfaces/courses.interface'
import { AssignmentEntity } from './assignments.entity'
import { EnrollmentEntity } from './enrollment.entity'

@Entity()
export class CourseEntity extends BaseEntity implements Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  code: string

  @OneToMany(() => AssignmentEntity, enrollment => enrollment.course)
  enrollments: EnrollmentEntity[]

  @OneToMany(() => AssignmentEntity, assignment => assignment.course)
  assignments: AssignmentEntity[]
}
