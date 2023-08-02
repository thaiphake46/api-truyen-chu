'use strict'
import * as db from '../db/models/index.js'

export const createANewStory = (payload) => {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const maxIdStory = await db.Story.max('id')
      Object.assign(payload, {
        storySlug: `${maxIdStory + 1}-${payload.storySlug}`,
      })
      const story = await db.Story.create(payload)
      const isCreateOk = !!story
      Object.assign(result, {
        data: isCreateOk ? story.toJSON() : story,
        errorCode: isCreateOk ? 0 : 1,
        status: isCreateOk ? 'OK' : 'Error',
        message: isCreateOk ? 'OK' : 'Tạo truyện mới không thành công',
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export const updateStory = (storyId, userId, payload) => {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const story = await db.Story.update(payload, {
        where: { id: storyId, userId: userId },
      })
      const isUpdateOk = !!story[0]
      Object.assign(result, {
        errorCode: isUpdateOk ? 0 : 1,
        status: isUpdateOk ? 'OK' : 'Error',
        message: isUpdateOk ? 'OK' : 'Không tìm thấy truyện cần sửa',
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export const removeStory = (storyId, userId) => {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const story = await db.Story.destroy({
        where: { id: storyId, userId: userId },
      })
      const isDeleteOk = !!story
      Object.assign(result, {
        errorCode: isDeleteOk ? 0 : 1,
        status: isDeleteOk ? 'OK' : 'Error',
        message: isDeleteOk ? 'OK' : 'Không tìm thấy truyện cần xóa',
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export const createANewChapter = (payload) => {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const maxChapter = await db.Chapter.max('chapterNumber', {
        where: { storyId: payload.storyId },
      })
      const maxIdChapter = await db.Chapter.max('id')
      Object.assign(payload, {
        chapterNumber: maxChapter + 1,
        chapterSlug: `${maxIdChapter + 1}-${payload.chapterSlug}`,
      })
      const chapter = await db.Chapter.create(payload)
      const isCreateOk = !!chapter
      Object.assign(result, {
        data: isCreateOk ? chapter.toJSON() : chapter,
        errorCode: isCreateOk ? 0 : 1,
        status: isCreateOk ? 'OK' : 'Error',
        message: isCreateOk ? 'OK' : 'Tạo chương mới không thành công',
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export const editChapter = (chapterId, storyId, payload) => {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const chapter = await db.Chapter.update(payload, {
        where: { id: chapterId, storyId },
      })
      const isUpdateOk = !!chapter[0]
      Object.assign(result, {
        errorCode: isUpdateOk ? 0 : 1,
        status: isUpdateOk ? 'OK' : 'Error',
        message: isUpdateOk ? 'OK' : 'Không tìm thấy chương cần sửa',
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export const removeChapter = (chapterId, storyId) => {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const chapter = await db.Chapter.destroy({
        where: { id: chapterId, storyId },
      })
      const isDeleteOk = !!chapter
      Object.assign(result, {
        errorCode: isDeleteOk ? 0 : 1,
        status: isDeleteOk ? 'OK' : 'Error',
        message: isDeleteOk ? 'OK' : 'Không tìm thấy chương cần xóa',
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export const findStoryById = (id) => {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const story = await db.Story.findOne({ where: { id } })
      const isFound = !!story
      Object.assign(result, {
        data: isFound ? story.toJSON() : story,
        errorCode: isFound ? 0 : 1,
        status: isFound ? 'OK' : 'Error',
        message: isFound ? 'OK' : 'Không tìm thấy truyện',
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export const findStoryAndChapterByStorySlug = (storySlug) => {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const story = await db.Story.findOne({
        where: { storySlug },
        attributes: {
          exclude: ['userId', 'UserId'],
        },
        include: [
          {
            model: db.User,
            as: 'storyAuthor',
            attributes: ['username'],
          },
          {
            model: db.Chapter,
            as: 'chapters',
            attributes: { exclude: ['storyId', 'StoryId', 'createdAt'] },
          },
        ],
        nest: true,
      })
      const isFound = !!story
      Object.assign(result, {
        data: isFound ? story.toJSON() : story,
        errorCode: isFound ? 0 : 1,
        status: isFound ? 'OK' : 'Error',
        message: isFound ? 'OK' : 'Không tìm thấy truyện',
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export const getStoryPostedByAuthor = (userId) => {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const storyAuthor = await db.User.findOne({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
        include: [
          {
            model: db.Story,
            attributes: {
              exclude: ['UserId', 'createdAt'],
            },
          },
        ],
        nest: true,
      })
      const isFound = !!storyAuthor
      Object.assign(result, {
        data: isFound ? storyAuthor : {},
        errorCode: isFound ? 0 : 1,
        status: isFound ? 'Ok' : 'Error',
        message: isFound ? 'OK' : 'Không tìm tháy truyện',
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export const guestGetRandomListStoryName = (limit = 10) => {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const listStoryName = await db.Story.findAll({
        raw: true,
        order: db.sequelize.random(),
        limit: +limit,
        attributes: {
          exclude: ['userId', 'UserId'],
        },
        include: [
          {
            model: db.User,
            as: 'storyAuthor',
            attributes: ['username'],
          },
        ],
        nest: true,
      })
      const isFound = !!listStoryName
      Object.assign(result, {
        data: isFound ? listStoryName : listStoryName,
        errorCode: isFound ? 0 : 1,
        status: isFound ? 'OK' : 'Error',
        message: isFound ? 'OK' : 'Không tìm thấy truyện',
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export const guestGetListChapterName = (storySlug) => {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const listChapter = await db.Chapter.findAll({ where: { storySlug } })
      const isFound = !!listChapter
      Object.assign(result, {
        data: isFound ? listStoryName : listStoryName,
        errorCode: isFound ? 0 : 1,
        status: isFound ? 'OK' : 'Error',
        message: isFound ? 'OK' : 'Không tìm thấy truyện',
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}
