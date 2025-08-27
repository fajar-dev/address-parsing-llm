import express, { Application } from 'express'
import routes from '@/routes/routes'
import errorHandler from '@/middlewares/errorHandler'

const app: Application = express()

// Middleware JSON
app.use(express.json())

// Routes utama
app.use("/", routes)

// Middleware error handler harus di paling bawah
app.use(errorHandler)

export default app
