import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
mongoose.connect('mongodb://127.0.0.1:27017/webtruyen')
    .then(() => {
        console.log("Connected seccessfully")
    })
app.listen(8000, () => {
    console.log("sever is running on 8000");
})
