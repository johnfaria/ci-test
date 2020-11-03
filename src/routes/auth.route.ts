import { signIn, signUp, getProfile } from '@src/controllers/auth.controller'
import { tokenValidation } from '@src/middlewares/auth'
import { Router } from 'express'
const router = Router()

router.post('/signin', signIn)
router.post('/signup', signUp)
router.get('/profile', tokenValidation, getProfile)

export default router
