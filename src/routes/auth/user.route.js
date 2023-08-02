'use strict'
import { Router } from 'express'
import * as userControllers from '../../controllers/user.controller.js'
import { verifyAccessToken } from '../../services/tokens.service.js'

const router = Router()

router.post('/login', userControllers.loginUser)

router.post('/register', userControllers.registerUser)

router.post('/register/author', userControllers.registerUser)

router.get('/profile', verifyAccessToken, userControllers.getProfile)

router.patch('/change-password', verifyAccessToken, userControllers.changePW)

export default router
