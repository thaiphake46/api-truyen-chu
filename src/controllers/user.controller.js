'use strict'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import * as userServices from '../services/user.service.js'
import * as tokenServices from '../services/tokens.service.js'

export const registerUser = async (req, res) => {
  const { password, email } = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashPw = bcrypt.hashSync(password, salt)

  /* kiểm tra xem route có phải là đăng ký tác giả không */
  let isAuthor = false

  if (req.path === '/register/author') {
    isAuthor = true
  }

  /* kiểm tra user đã tồn tại trong db */
  try {
    const user = await userServices.findUserByEmail(email)
    if (user) {
      return res.json({
        status: 'Error',
        message: 'Email đã tồn tại',
      })
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }

  /* tạo mới user vào db */
  const userBody = { ...req.body, password: hashPw, isAuthor }
  try {
    await userServices.createANewUser(userBody)
    return res.status(201).json({
      status: 'OK',
      message: 'Đăng ký thành công',
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = {}

  /* kiểm tra đúng email và mật khẩu trong db */
  try {
    await Object.assign(user, await userServices.findUserByEmail(email))

    if (!user) {
      return res.status(400).json({
        status: 'Error',
        message: 'Email chưa được đăng ký',
      })
    }

    /* is equal password */
    const isEqualPw =
      user &&
      Object.keys(user).length > 0 &&
      bcrypt.compareSync(password, user.password)

    if (!isEqualPw) {
      return res.status(400).json({
        status: 'Error',
        message: 'Mật khẩu chưa chính xác',
      })
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }

  const accessToken = tokenServices.generateAccessToken({
    sub: user.id,
    isAuthor: user.isAuthor,
  })
  const refreshToken = tokenServices.generateRefreshToken({
    sub: user.id,
    isAuthor: user.isAuthor,
  })

  return res.json({
    status: 'OK',
    user: {
      username: user.username,
      isAuthor: user.isAuthor,
    },
    tokens: { accessToken, refreshToken },
  })
}

export const getProfile = async (req, res) => {
  const reqUser = { ...req.user }
  const user = {}

  try {
    Object.assign(user, await userServices.findUserById(reqUser.sub))
    delete user.password
    delete user.createdAt
    delete user.updatedAt
    return res.status(200).json({
      status: 'OK',
      result: user,
    })
  } catch (error) {
    console.log({ error })
    return res.sendStatus(500)
  }
}

export const checkAuthor = async (req, res, next) => {
  const { sub } = req.user
  const user = await userServices.findUserById(sub).catch((error) => {
    return req.status(500).json({ error: error })
  })
  if (!user?.isAuthor) {
    return res
      .status(403)
      .json({ errCode: 1, message: 'Bạn không có quyền truy cập' })
  }
  next()
}

export const refreshToken = async (req, res) => {
  const { sub, isAuthor } = req.user
  res.json({
    accessToken: tokenServices.generateAccessToken({ sub, isAuthor }),
  })
}
