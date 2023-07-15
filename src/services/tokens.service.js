'use strict'
import jwt from 'jsonwebtoken'

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '10m',
  })
}

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '7d',
  })
}

export const verifyAccessToken = (req, res, next) => {
  // authorization: Bearer <token>
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
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
    if (error) {
      return res.sendStatus(403)
    }
    req.user = decoded
    next()
  })
}
