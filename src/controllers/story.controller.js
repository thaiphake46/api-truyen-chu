'use strict'
import 'dotenv/config'
import generateSlug from '../utils/generateSlug.js'
import * as storyServices from '../services/story.service.js'

export const createStory = async (req, res) => {
  const { storyName } = req.body
  const imageStringBase64 = `data:${
    req.file.mimetype
  };base64,${req.file.buffer.toString('base64')}`

  const condition = storyName
  if (!condition) {
    return res.status(400).json({
      status: 'Error',
      message: 'Chưa điền đủ thông tin',
    })
  }

  const payload = {
    storySlug: generateSlug(storyName),
    storyImage: imageStringBase64,
    storyName: storyName,
    userId: req.user.sub,
  }

  /* create a new story */
  try {
    const result = await storyServices.createANewStory(payload)
    return res.status(201).json({
      status: result.status,
    })
  } catch (error) {
    console.log({ error })
    return res.sendStatus(500)
  }
}

export const editImageStory = async (req, res) => {
  const imageStringBase64 = `data:${
    req.file.mimetype
  };base64,${req.file.buffer.toString('base64')}` // convert img to base64 uri

  const payload = {
    storyImage: imageStringBase64,
  }

  /* update story info to db */
  try {
    const storyId = req.params.id
    const userId = req.user.sub
    const result = await storyServices.updateStory(storyId, userId, payload)
    return res.json({
      status: result.status,
    })
  } catch (error) {
    console.log({ error })
    return res.sendStatus(500)
  }
}

export const editInfoStory = async (req, res) => {
  const { storyName } = req.body

  const condition = storyName
  if (!condition) {
    return res.status(400).json({
      status: 'Error',
      message: 'Chưa điền đủ thông tin',
    })
  }

  const payload = {
    storySlug: generateSlug(req.body.storyName),
    storyName: req.body.storyName,
  }

  /* update story info to db */
  try {
    const storyId = req.params.id
    const userId = req.user.sub
    const result = await storyServices.updateStory(storyId, userId, payload)
    return res.json({
      status: result.status,
    })
  } catch (error) {
    console.log({ error })
    return res.sendStatus(500)
  }
}

export const removeStory = async (req, res) => {
  const storyId = req.params.id
  const userId = req.user.sub
  try {
    const result = await storyServices.removeStory(storyId, userId)
    return res.json({
      status: result.status,
    })
  } catch (error) {
    console.log({ error })
    return res.sendStatus(500)
  }
}

export const createChapter = async (req, res) => {
  const { chapterName, chapterContent, storyId } = req.body
  const condition = chapterName || chapterContent || storyId

  if (!condition) {
    return res.status(400).json({
      status: 'Error',
      message: 'Chưa điền đủ thông tin',
    })
  }

  try {
    const result = await storyServices.findStoryById(storyId)
    if (!result.data) {
      return res.json({
        status: result.status,
        message: result.message,
      })
    }
  } catch (error) {
    console.log({ error })
    return res.sendStatus(500)
  }

  const payload = {
    chapterSlug: generateSlug(chapterName),
    chapterName: chapterName,
    chapterContent: chapterContent,
    storyId: storyId,
  }

  try {
    const result = await storyServices.createANewChapter(payload)
    return res.status(201).json({
      status: result.status,
    })
  } catch (error) {
    console.log({ error })
    return res.sendStatus(500)
  }
}

export const editChapter = async (req, res) => {
  const chapterId = req.params.chapterId
  const storyId = req.params.storyId

  const { chapterName, chapterContent } = req.body

  const condition = chapterName || chapterContent
  if (!condition) {
    return res.status(400).json({
      errorCode: 1,
      status: 'Error',
      message: 'Chưa điền đủ thông tin',
    })
  }

  const payload = {
    chapterContent: chapterContent,
    chapterName: chapterName,
  }

  try {
    const result = await storyServices.editChapter(chapterId, storyId, payload)
    return res.status(200).json({
      status: result.status,
    })
  } catch (error) {
    console.log({ error })
    return res.sendStatus(500)
  }
}

export const removeChapter = async (req, res) => {
  const chapterId = req.params.chapterId
  const storyId = req.params.storyId

  try {
    const result = await storyServices.removeChapter(chapterId, storyId)
    return res.status(200).json({
      status: result.status,
    })
  } catch (error) {
    console.log({ error })
    return res.sendStatus(500)
  }
}

export const getStoryPostedByAuthor = async (req, res) => {
  try {
    const result = await storyServices.getStoryPostedByAuthor(req.user.sub)
    return res.json({
      status: result.status,
      result: result.data,
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export const guestGetRandomListStoryName = async (req, res) => {
  const limit = req.query.limit
  try {
    const result = await storyServices.guestGetRandomListStoryName(limit)
    return res.json({
      status: result.status,
      result: result.data,
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export const guestGetAStoryAndListChapter = async (req, res) => {
  const storySlug = req.params.storySlug
  try {
    const result = await storyServices.findStoryAndChapterByStorySlug(storySlug)
    return res.json({
      status: result.status,
      result: result.data,
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}
