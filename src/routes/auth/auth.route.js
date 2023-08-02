import { Router } from 'express'
import * as userControllers from '../../controllers/user.controller.js'
import { verifyRefreshToken } from '../../services/tokens.service.js'

const router = Router()

router.get('/refresh-token', verifyRefreshToken, userControllers.refreshToken)

export default router
