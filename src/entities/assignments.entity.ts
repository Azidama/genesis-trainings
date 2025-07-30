import { IsNotEmpty } from 'class-validator'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToMany, ManyToOne } from 'typeorm'
import { UserEntity } from './users.entity'
import { Assignment } from '@/interfaces/assignments.interface'
import { CourseEntity } from './courses.entity'

@Entity()
export class AssignmentEntity extends BaseEntity implements Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => CourseEntity, (course) => course.id)
  course: CourseEntity

}
