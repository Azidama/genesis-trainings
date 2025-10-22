import AppDataSource from './config'
import { seedDb } from '@/scripts/seed'

export const dbConnection = async () => {
  await AppDataSource.initialize()
  try {
    await AppDataSource.runMigrations()
  } catch (error) {
    console.log("Error while running migrations: ", error)
  }
  await seedDb()
}
