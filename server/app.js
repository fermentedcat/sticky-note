const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const accessRouter = require('./routes/access')
const stackRouter = require('./routes/stack')
const todoRouter = require('./routes/todo')
const userRouter = require('./routes/user')
const indexRouter = require('./routes/index')

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

app.use('/api/access', accessRouter)
app.use('/api/todo', todoRouter)
app.use('/api/stack', stackRouter)
app.use('/api/user', userRouter)
app.use('/', indexRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = app
