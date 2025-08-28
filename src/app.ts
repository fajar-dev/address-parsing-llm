import express, { Application } from 'express'
import routes from '@/routes/routes'
import { errorHandler } from './middlewares/errorHandler'
import cors from 'cors'
import { corsOptions } from './config/cors'

const app: Application = express()

// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(errorHandler.handle)

// Routes
app.use("/", routes)

export default app
