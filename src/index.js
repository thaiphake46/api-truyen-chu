'use strict'
import 'dotenv/config'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import indexRoute from './routes/index.route.js'
import { randomUUID } from 'crypto'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())
app.use(compression())

/* route */
app.use('/', indexRoute)

/* listen */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
