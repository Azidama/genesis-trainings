import { join } from 'path'
import { createConnection, ConnectionOptions } from 'typeorm'
import { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, ADMIN_EMAIL, ADMIN_PASSWORD } from '@config'
import { UserEntity } from '@/entities/users.entity' 
import bcrypt from 'bcrypt'
import { UserRole } from '@/interfaces/users.interface'

export const dbConnection = async () => {
  const dbConfig: ConnectionOptions = {
    type: 'postgres',
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
    subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  }

  const connection = await createConnection(dbConfig)

  // Seed admin
  const userRepo = connection.getRepository(UserEntity)
  const existingAdmin = await userRepo.findOne({ where: { role: UserRole.ADMIN } })
  if (!existingAdmin) {
    const admin = userRepo.create({
      name: 'Admin',
      email: ADMIN_EMAIL,
      role: UserRole.ADMIN,
      password: await bcrypt.hash(ADMIN_PASSWORD, 10),
    })
    await userRepo.save(admin)
    console.log('Seeded admin account')
  } else {
    console.log('Admin already exists')
  }
}
