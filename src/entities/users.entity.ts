import { IsNotEmpty, IsOptional } from 'class-validator'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User, UserRole } from '@interfaces/users.interface'

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsOptional()
  firstName: string

  @Column()
  @IsOptional()
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
}
