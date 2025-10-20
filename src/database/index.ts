import AppDataSource from './config'
import { seedDb } from '@/scripts/seed'

export const dbConnection = async () => {
  await AppDataSource.initialize()
  await seedDb()
}
