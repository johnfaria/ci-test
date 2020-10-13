import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb';
import { BaseEntity } from './models/BaseEntity'
import { User } from './models/User'

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<User>,
};

export const connect = async (): Promise<MikroORM>  => {
  const orm = await MikroORM.init<MongoDriver>({
    entities: [User, BaseEntity],
    type: 'mongo',
    clientUrl:
      'hardcode',
    implicitTransactions: true, // defaults to false
    // baseDir: __dirname, // defaults to `process.cwd()`
  })

  await orm.em.getDriver().createCollections();

  DI.orm = orm
  DI.em = orm.em
  DI.userRepository = DI.orm.em.getRepository(User)
  return orm
}