'use strict'
import { Router } from 'express'
import * as storyControllers from '../controllers/story.controller.js'
import { checkAuthor } from '../controllers/user.controller.js'
import { verifyAccessToken } from '../services/tokens.service.js'
import handleErrorImageUpload from '../helpers/handleErrorImageUpload.js'

const router = Router()

/* story */
router.post(
  '/create-a-new-story',
  verifyAccessToken,
  checkAuthor,
  handleErrorImageUpload,
  storyControllers.createStory
)

router.patch(
  '/patch/image-story/:id',
  verifyAccessToken,
  checkAuthor,
  handleErrorImageUpload,
  storyControllers.editImageStory
)

router.patch(
  '/patch/info-story/:id',
  verifyAccessToken,
  checkAuthor,
  storyControllers.editInfoStory
)

router.delete(
  '/delete/story/:id',
  verifyAccessToken,
  checkAuthor,
  storyControllers.removeStory
) /* --------------------------------- */

/* chapter */
router.post(
  '/create-a-new-chapter',
  verifyAccessToken,
  checkAuthor,
  storyControllers.createChapter
)

router.patch(
  '/patch/chapter/:storyId/:chapterId',
  verifyAccessToken,
  checkAuthor,
  storyControllers.editChapter
)

router.delete(
  '/delete/chapter/:storyId/:chapterId',
  verifyAccessToken,
  checkAuthor,
  storyControllers.removeChapter
) /* --------------------------------- */

router.get(
  '/getStoryPostedByAuthor',
  verifyAccessToken,
  checkAuthor,
  storyControllers.getStoryPostedByAuthor
)

router.get(
  '/guestGetRandomListStoryName',
  storyControllers.guestGetRandomListStoryName
)

router.get('/:storySlug', storyControllers.guestGetAStoryAndListChapter)

export default router
