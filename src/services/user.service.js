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

export const changePassword = ({ userId, password }) => {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const user = await db.User.update({ password }, { where: { id: userId } })
      const isUpdateOk = !!user[0]
      Object.assign(result, {
        errorCode: isUpdateOk ? 0 : 1,
        status: isUpdateOk ? 'OK' : 'Error',
        message: isUpdateOk ? 'OK' : 'Không tìm thấy người dùng',
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}
