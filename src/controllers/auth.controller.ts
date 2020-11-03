import { User } from '@src/models/User'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import jwt from 'jsonwebtoken'
import config, { IConfig } from 'config'
const jwt_config: IConfig = config.get('App.auth')

export async function signIn(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body

  const user = await getRepository(User).findOne({ email: email })
  if (!user) {
    res.status(400).json({ message: 'Email or password is wrong' })
  }

  const passwordIsValid = user?.validatePassword(password)
  if (!passwordIsValid) {
    res.status(400).json({ message: 'Invalid password' })
  }

  const token = jwt.sign(
    { id: user?.id, username: user?.username, email: user?.email },
    jwt_config.get('key'),
    { expiresIn: 60 * 60 }
  )

  res.header('auth-token', `Bearer ${token}`).json(user)
}

export async function signUp(req: Request, res: Response): Promise<void> {
  const user = new User()
  user.username = req.body.username
  user.fullname = req.body.fullname
  user.email = req.body.email
  user.password = req.body.password
  const result = await getRepository(User).save(user)

  const token: string = jwt.sign(
    { id: result.id, username: result.username, email: result.email },
    jwt_config.get('key'),
    { expiresIn: 60 * 60 }
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...response } = result

  res.header('auth-token', `Bearer ${token}`).json(response)
}

export async function getProfile(req: Request, res: Response): Promise<void> {
  res.send(req.decoded)
}

