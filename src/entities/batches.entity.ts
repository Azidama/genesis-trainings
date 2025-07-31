import { BaseEntity, Entity, OneToOne, PrimaryColumn } from 'typeorm'
import { Batch, BatchSession } from '@/interfaces/batches.interface'
import { UserEntity } from './users.entity'

const batchYear = new Date().toLocaleDateString('en', { year: '2-digit' })
// const batchDateSpring = `${BatchSession.BATCH_SPRING}-${batchYear}`
const batchDateFall = `${BatchSession.BATCH_FALL}-${batchYear}`

@Entity()
export class BatchEntity extends BaseEntity implements Batch {
  @PrimaryColumn({
    default: batchDateFall,
  })
  id: string

  @OneToOne(() => UserEntity, user => user.id, { nullable: true })
  user: UserEntity
}
