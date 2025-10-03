import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm'
import { CourseEntity } from './courses.entity'
import { UserEntity } from './users.entity'
import { Enrollment } from '@/interfaces/enrollments.interface'

@Entity()
@Unique(['student', 'course'])
export class EnrollmentEntity extends BaseEntity implements Enrollment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity, student => student.enrollments, { onDelete: 'CASCADE' })
  student: UserEntity

  @ManyToOne(() => CourseEntity, course => course.enrollments, { onDelete: 'CASCADE' })
  course: CourseEntity

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrolledAt: Date

  @Column({ default: true })
  isPaid: boolean
}
