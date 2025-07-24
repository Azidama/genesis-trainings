import { IsNotEmpty } from 'class-validator'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToMany } from 'typeorm'
import { Course } from '@/interfaces/courses.interface'
import { UserEntity } from './users.entity'

@Entity()
export class CourseEntity extends BaseEntity implements Course {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => UserEntity, (user) => user.id)
  user: UserEntity

}
