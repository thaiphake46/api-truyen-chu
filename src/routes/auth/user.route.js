'use strict'
import { Router } from 'express'
import * as userControllers from '../../controllers/user.controller.js'
import { verifyAccessToken } from '../../services/tokens.service.js'

const router = Router()

router.post('/login', userControllers.loginUser)

router.post('/register', userControllers.registerUser)

router.post('/register/author', userControllers.registerUser)

router.get('/profile', verifyAccessToken, userControllers.getProfile)

/* story */
router.post(
  '/upload/story',
  verifyAccessToken,
  userControllers.checkAuthor,
  userControllers.handleErrorImageUpload,
  userControllers.createStory
)

router.patch(
  '/patch/story/:id',
  verifyAccessToken,
  userControllers.checkAuthor,
  userControllers.handleErrorImageUpload,
  userControllers.editStory
)

router.delete(
  '/delete/story/:id',
  verifyAccessToken,
  userControllers.checkAuthor,
  userControllers.removeStory
)

router.get(
  '/getStoryPostedByAuthor',
  verifyAccessToken,
  userControllers.getStoryPostedByAuthor
)

/* chapter */
router.post(
  '/upload/story/chapter',
  verifyAccessToken,
  userControllers.createChapter
)

router.patch(
  '/patch/chapter/:storyId/:chapterId',
  verifyAccessToken,
  userControllers.checkAuthor,
  userControllers.editChapter
)

router.delete(
  '/delete/chapter/:storyId/:chapterId',
  verifyAccessToken,
  userControllers.checkAuthor,
  userControllers.removeChapter
)

export default router
