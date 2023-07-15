'use strict'
import * as db from '../db/models/index.js'

// find user by email
export const findUserByEmail = async (email) => {
  return await db.User.findOne({ where: { email: email }, raw: true })
}

// create a new user
export const createANewUser = async (payload) => {
  return await db.User.create(payload)
}

// find user by id
export const findUserById = async (id) => {
  return await db.User.findOne({ where: { id: id }, raw: true })
}
