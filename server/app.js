const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')

const app = express()

const PORT = process.env.PORT || 5000
const URI = process.env.DB_URI

mongoose.connect(URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = app
