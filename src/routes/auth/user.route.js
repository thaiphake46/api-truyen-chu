'use strict'
import { Router } from 'express'
import * as userControllers from '../../controllers/user.controller.js'
import { verifyAccessToken } from '../../services/tokens.service.js'

const router = Router()

router.post('/login', userControllers.loginUser)

router.post('/register', userControllers.registerUser)

router.post('/register/author', userControllers.registerUser)

router.get('/profile', verifyAccessToken, userControllers.getProfile)

router.post(
  '/upload/story',
  verifyAccessToken,
  userControllers.checkAuthor,
  userControllers.handleErrorImageUpload,
  userControllers.createStory
)

router.post('/upload/story/chapter', verifyAccessToken, userControllers.createChapter)

export default router
