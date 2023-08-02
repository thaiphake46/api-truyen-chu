'use strict'
import jwt from 'jsonwebtoken'

const oneMinute = 1000 * 60
const oneDay = 1000 * 60 * 60 * 24
const expiresInAccessToken = 10 // mm: phút
const expiresInRefreshToken = 7 // dd: ngày

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: `${expiresInAccessToken}m`,
  })
}

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: `${expiresInRefreshToken}d`,
  })
}

export const verifyAccessToken = (req, res, next) => {
  // authorization: Bearer <token>
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    const timeBeetwen = (decoded.exp - decoded.iat) * 1000
    const minutesDiff =
      Math.floor(timeBeetwen / oneMinute) === expiresInAccessToken
    if (error || !minutesDiff) {
      return res.sendStatus(403)
    }
    req.user = decoded
    next()
  })
}

export const verifyRefreshToken = (req, res, next) => {
  const token = req.body.refreshToken
  if (!token) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    const timeBeetwen = (decoded.exp - decoded.iat) * 1000
    const daysDiff = Math.floor(timeBeetwen / oneDay) === expiresInRefreshToken
    console.log(daysDiff)
    if (error || !daysDiff) {
      return res.sendStatus(403)
    }
    req.user = decoded
    next()
  })
}
