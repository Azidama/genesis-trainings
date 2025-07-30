import { IsNotEmpty } from 'class-validator'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToMany, OneToMany } from 'typeorm'
import { Course } from '@/interfaces/courses.interface'
import { UserEntity } from './users.entity'
import { AssignmentEntity } from './assignments.entity'

@Entity()
export class CourseEntity extends BaseEntity implements Course {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => UserEntity, (user) => user.id)
  user: UserEntity

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.id)
  assignment: AssignmentEntity
  

}
