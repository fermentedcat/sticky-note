const User = require('../models/User')
const format = require('../utils/format')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/* 
GET     /api/user/      - get all users (friends) for logged in user
GET     /api/user/:id   - get one user
POST    /api/user/      - add new user
POST    /api/user/:id   - update user
DELETE  /api/user/:id   - delete user
*/

exports.getAll = (req, res, next) => {
  User.find()
  .then(users => {
    if (!users) res.sendStatus(404)
    else res.status(200).json(users)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.getById = (req, res, next) => {
  const id = req.params.id
  User.findById(id)
  .then(user => {
    if (!user) res.sendStatus(404)
    else res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.authenticate = (req, res, next) => {
  res.status(200).json(req.user)
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne(
    { $or: [{ email: email }, { username: email }]}
    ).select('password username').exec()
    
  try {
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Failed to login.')
    }
    // Create token
    const token = jwt.sign(
      { username: user.username },
      process.env.TOKEN_KEY,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    )
    res.status(200).send(token)
  } catch (error) {
    res.status(401).json({ error: error.message })    
  }
}

exports.addNew = (req, res, next) => {
  const userData = req.body

  new User(userData).save((error, user) => {
    if (error) {
      const err = format.error(error)
      res.status(400).json(err)
    }
    // Create token
    const token = jwt.sign(
      { username: user.username },
      process.env.TOKEN_KEY,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    )
    res.status(200).json({ token: token })
  })
}

exports.update = (req, res, next) => {
  const id = req.params.id
  const data = req.body
  User.findByIdAndUpdate(
    id, 
    data, 
    { new: true }
  )
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.delete = (req, res, next) => {
  const id = req.params.id
  User.findByIdAndDelete(id)
  .then((user) => {
    if (!user) res.sendStatus(404)
    else res.sendStatus(204)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}