import express from 'express'
import cookieParser from 'cookie-parser'
import {userRouter} from "./routes/userRoutes.js"
import {authRouter} from "./routes/authRoutes.js"
import {articleRouter} from './routes/articleRoutes.js'
import {uploadFileRouter} from './routes/uploadFileRouter.js'
import {connectdb} from "./dbconnect/mongodb.js"
import dotenv from 'dotenv'
import cors from 'cors'
import {otpRouter} from './routes/otpRoutes.js'
import {commentRouter} from './routes/commentRoutes.js'
import {startCleanup} from './cronJobs/startCleanup.js'
import {sendMailReminder} from './cronJobs/sendMailReminder.js'

dotenv.config()
connectdb()

const app = express()
startCleanup()
sendMailReminder()

//MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//show static images
app.use('/uploads', express.static('uploads'))

//ROUTES
app.use('/api', userRouter)
app.use('/api', authRouter)
app.use('/api', articleRouter)
app.use('/api', otpRouter)
app.use('/api', uploadFileRouter)
app.use('/api', commentRouter)

const port = process.env.PORT 

app.listen(port, console.log(`Server is listening on ${port}`));