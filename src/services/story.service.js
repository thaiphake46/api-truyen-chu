import * as db from '../db/models/index.js'

export const createANewStory = async (payload) => {
  return await db.Story.create(payload)
}
