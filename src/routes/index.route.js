'use strict'
import { Router } from 'express'
import * as indexControllers from '../controllers/index.controller.js'
import apiRoute from './api.route.js'

const router = Router()

router.get('/helloWorld', indexControllers.helloWorld)

router.use('/api', apiRoute)

export default router
