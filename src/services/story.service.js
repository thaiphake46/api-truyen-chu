import * as db from '../db/models/index.js'

export const createANewStory = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const story = await db.Story.create(payload)
      resolve(story)
    } catch (error) {
      reject(error)
    }
  })
}

export const findStoryById = async (id, raw = false) => {
  return await db.Story.findOne({ where: { id }, raw })
}

export const findStoryByIdAndUserId = async (id, userId, raw = false) => {
  return await db.Story.findOne({ where: { id, userId }, raw })
}

export const getStoryPostedByAuthor = (userId) => {
  return new Promise(async (resolve, reject) => {
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
              exclude: ['UserId', 'storyImage', 'createdAt'],
            },
          },
        ],
        nest: true,
      })
      resolve(storyAuthor)
    } catch (error) {
      reject(error)
    }
  })
}

export const createANewChapter = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chapter = await db.Chapter.create(payload)
      resolve(chapter)
    } catch (error) {
      reject(error)
    }
  })
}

export const editChapter = (chapterId, storyId, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chapter = await db.Chapter.findOne({
        where: { id: chapterId, storyId },
      })
      if (chapter) {
        Object.assign(chapter, payload)
        await chapter.save()
      }
      resolve(chapter)
    } catch (error) {
      reject(error)
    }
  })
}

export const removeChapter = (chapterId, storyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Chapter.destroy({ where: { id: chapterId, storyId } })
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
