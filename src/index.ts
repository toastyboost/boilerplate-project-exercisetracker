import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser"
import mongoose from "mongoose";

import { router } from "./router"
// import { errorHandler } from "./utils/errors"

require('dotenv').config()

const uri = `mongodb+srv://admin:${encodeURIComponent('password')}@cluster0.xjlfz.mongodb.net/users?retryWrites=true&w=majority`;
mongoose.connect(uri);

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.use('/api', router)

// app.use(errorHandler)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Your app is listening on port ' + port)
})
