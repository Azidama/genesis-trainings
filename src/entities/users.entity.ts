import { IsNotEmpty } from 'class-validator'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToMany } from 'typeorm'
import { User, UserRole } from '@interfaces/users.interface'
import { CourseEntity } from './courses.entity'
import { AssignmentEntity } from './assignments.entity'

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
    default: UserRole.STUDENT
  })
  role: UserRole

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => CourseEntity, (course) => course.id)
  course: CourseEntity

  @ManyToMany(() => AssignmentEntity, (assignment) => assignment.id)
  assignment: AssignmentEntity
}
