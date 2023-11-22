import dotenv from 'dotenv'

import connectToDB from './db/index.js'
import app from './app.js'

const PORT = process.env.PORT

dotenv.config({
    path: "./env"
})
connectToDB()
.then(()=>{
    app.listen(PORT, (req, res)=>{
        console.log("Server is running on port ", PORT)
    })
})
.catch((error)=> console.log("Mongodb connection failed: ", error))