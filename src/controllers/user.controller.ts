import { User } from '@src/models/User'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export async function getUsers(req: Request, res: Response): Promise<void> {
  const result = await getRepository(User).find()
  res.send(result)
}

export async function getUser(req: Request, res: Response): Promise<void> {
  const result = await getRepository(User).findOne(req.params.id)
  res.send(result)
}

export async function postUser(req: Request, res: Response): Promise<void> {
  const { username, fullname, email, password } = req.body
  const user = new User()
  user.username = username
  user.fullname = fullname
  user.email = email
  user.password = password
  await user.hashPassword()
  const result = await getRepository(User).save(user)
  res.send(result)
}

export async function editUser(req: Request, res: Response): Promise<void> {
  if (req.body.password) {
    delete req.body.password
  }
  const result = await getRepository(User).update(
    { id: +req.params.id },
    req.body
  )
  res.send(result)
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const result = await getRepository(User).delete({ id: +req.params.id })
  res.send(result)
}
