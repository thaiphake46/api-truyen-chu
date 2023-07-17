import * as db from '../db/models/index.js'

export const createANewStory = async (payload) => {
  return await db.Story.create(payload)
}

export const findStoryById = async (id, raw = false) => {
  return await db.Story.findOne({ where: { id }, raw })
}

export const findStoryByIdAndUserId = async (id, userId, raw = false) => {
  return await db.Story.findOne({ where: { id, userId }, raw })
}
