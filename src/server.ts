import express, { Application } from 'express'
import * as http from 'http'
import userRoute from '@src/routes/user.route'
import authRoute from '@src/routes/auth.route'
import * as database from './database'
import logger from './logger'
import cors from 'cors'
import expressPino from 'express-pino-logger'
import { Connection } from 'typeorm'
import config, { IConfig } from 'config'

export class SetupServer {
  private server?: http.Server
  private database?: Connection

  constructor(
    private port: IConfig = config.get('App.port'),
    private app: Application = express()
  ) {}

  public get App(): Application {
    return this.app
  }

  public async init(): Promise<void> {
    this.middlewares()
    this.controllers()
    await this.initDatabase()
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(cors({ origin: '*' }))
    this.app.use(expressPino({ logger: logger }))
  }

  private controllers(): void {
    this.app.use('/api/user', userRoute)
    this.app.use('/auth/', authRoute)
  }

  private async initDatabase(): Promise<void> {
    this.database = await database.databaseConnect()
    logger.info('Connected to the Database')
  }

  public closeServer(): void {
    if (this.server) {
      this.server.close()
    }
  }

  public async closeDatabase(): Promise<void> {
    await this.database?.close()
  }

  public start(): void {
    this.server = this.app.listen(this.port)
    logger.info(`Server listen on port ${this.port.toString()}`)
  }
}
