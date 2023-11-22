import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}))

// parse incoming JSON request with a limit of 16kb
app.use(express.json({limit: "16kb"}))
// Parse incoming URL-encoded data with extended options and a limit of 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

export default app