import { Router } from 'express'
const router = Router()

import {
  deleteUser,
  editUser,
  getUser,
  getUsers,
} from '@src/controllers/user.controller'
import { tokenValidation } from '@src/middlewares/auth'

router.get('/', getUsers)

router.get('/:id', getUser)

router.put('/:id', tokenValidation, editUser)

router.delete('/:id', deleteUser)

export default router
