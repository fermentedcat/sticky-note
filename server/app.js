const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const accessRouter = require('./routes/access')
const stackRouter = require('./routes/stack')
const todoRouter = require('./routes/todo')
const userRouter = require('./routes/user')
const indexRouter = require('./routes/index')

const app = express()

// to not send status 304, but I still have to figure this out
app.disable('etag')

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

module.exports = app
