import { DataSource } from 'typeorm'
import { join } from 'path'
import { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } from '@config'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [join(__dirname, '..', 'entities', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migration', '**', '*.{ts,js}')],
  subscribers: [join(__dirname, '..', 'subscribers', '**', '*.{ts,js}')],
})

export default AppDataSource
