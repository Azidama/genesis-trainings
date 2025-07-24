import { IsNotEmpty } from 'class-validator'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToMany } from 'typeorm'
import { UserEntity } from './users.entity'
import { Assignment } from '@/interfaces/assignments.interface'

@Entity()
export class AssignmentEntity extends BaseEntity implements Assignment {
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
