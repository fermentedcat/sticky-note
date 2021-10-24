const User = require('../models/User')
const bcrypt = require('bcrypt')
const createToken = require('../utils/createToken')

/*
GET     /api/user/auth  - authenticate user
GET     /api/user/me   - get logged in user
GET     /api/user/search/:string   - get all by part of username
GET     /api/user/      - get all users (friends) for logged in user
GET     /api/user/:id   - get one user

POST    /api/user/login  - login user
POST    /api/user/addPin  - add pinned
POST    /api/user/removePin  - remove pinned todo
POST    /api/user/      - add new user
POST    /api/user/:id   - update user

DELETE  /api/user/:id   - delete user
*/

exports.authenticate = (req, res, next) => {
  res.status(200).json(req.user)
}

exports.getLoggedInUser = async (req, res, next) => {
  const { username } = req.user
  try {
    const user = await User.findOne({ username })
    if (!user) res.sendStatus(404)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getAllByUsername = async (req, res, next) => {
  const string = req.params.string
  try {
    const users = await User.find({
      username: { $regex: string, $options: 'i' }
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getById = async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { username: email }]
    }).select('password username role')

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Failed to login.')
    }
    const token = createToken(user)
    res.status(200).send(token)
  } catch (error) {
    res.status(401).json(error)
  }
}

exports.addTodoPin = (req, res, next) => {
  const { username } = req.user
  const todoId = req.body.todoId

  User.findOneAndUpdate({ username }, { $push: { pinnedTodos: todoId } })
    .then(() => {
      res.status(200).send('Saved')
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}

exports.removeTodoPin = (req, res, next) => {
  const { username } = req.user
  const todoId = req.body.todoId

  User.findOneAndUpdate({ username }, { $pull: { pinnedTodos: todoId } })
    .then(() => {
      res.status(200).send('Saved')
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}

exports.addNew = async (req, res, next) => {
  const userData = req.body

  try {
    const user = await new User(userData).save()
    const token = createToken(user)
    res.status(200).send(token)
  } catch (error) {
    res.status(400).json(error)
  }
}

exports.update = async (req, res, next) => {
  const username = req.params.username
  const data = req.body

  try {
    const user = await User.findOneAndUpdate({ username }, data, { new: true })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}

exports.delete = (req, res, next) => {
  const username = req.params.username
  User.findOneAndDelete({ username })
    .then((user) => {
      if (!user) res.sendStatus(404)
      else res.sendStatus(204)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}
