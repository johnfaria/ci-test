import { Connection, createConnection } from 'typeorm'
import config, { IConfig } from 'config'
import { User } from './models/User'
const dbConfig: IConfig = config.get('App.database')

const host: string = dbConfig.get('host')
const port: number = dbConfig.get('port')
const username: string = dbConfig.get('username')
const password: string = dbConfig.get('password')
const database: string = dbConfig.get('database')

export async function databaseConnect(): Promise<Connection> {
  return await createConnection({
    type: 'postgres',
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    entities: [User],
    synchronize: true,
    logging: false,
  })  
}
