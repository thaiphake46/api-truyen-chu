'use strict'
import { Router } from 'express'
import userRoute from './auth/user.route.js'
import storyRoute from './story.route.js'

const router = Router()

router.use('/user', userRoute)
router.use('/story', storyRoute)

export default router
