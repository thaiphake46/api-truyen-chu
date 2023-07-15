'use strict'
import { Router } from 'express'
import userRoute from './auth/user.route.js'

const router = Router()

router.use('/user', userRoute)

export default router
