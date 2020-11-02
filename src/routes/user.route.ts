import { Router } from 'express'
const router = Router()

import {
  deleteUser,
  editUser,
  getUser,
  getUsers,
  postUser,
} from '@src/controllers/user.controller'

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/', postUser)

router.put('/:id', editUser)

router.delete('/:id', deleteUser)

export default router
