  
import express from 'express'
import mongoose from 'mongoose'
import route from './Routes/auth.js'

const app=express()
import cors from 'cors'

import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

 dotenv.config()
const mongooseConnect=async()=>{
    try{
        const connection=await mongoose.connect(process.env.MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log("MongoDB  connected")
    }
    catch(error)
    {
        console.log(error)
    }
}
mongooseConnect()


app.use(cookieParser())

 app.use(express.json())
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))

app.use('/api/user',route)

app.get('/',(req,res)=>{
    res.send('Api is running...')
})

const PORT = process.env.PORT || 4000
app.listen(PORT  ,console.log(`Server running  on port ${PORT}`))