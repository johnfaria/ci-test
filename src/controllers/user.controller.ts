import { User } from '@src/models/User'
import { Request, Response } from 'express'
import { getConnection, getRepository } from 'typeorm'

export async function getUsers(req: Request, res: Response): Promise<void> {
  const result = await getRepository(User).find()
  res.send(result)
}

export async function getUser(req: Request, res: Response): Promise<void> {
  const result = await getRepository(User).findOne(req.params.id)
  res.send(result)
}

export async function editUser(req: Request, res: Response): Promise<void> {
  const user = await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({languages: req.body.languages})
    .where("id = :id", { id: req.decoded.id })
    .execute();

  res.send(user)  
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const result = await getRepository(User).delete({ id: +req.params.id })
  res.send(result)
}
