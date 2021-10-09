const User = require('../models/User')
const passport = require('passport')

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

exports.addNew = (req, res, next) => {
  const {
    fullName,
    username,
    email,
    password
  } = req.body

  new User({
    fullName,
    username,
    email,
    password
  }).save((error, user) => {
    if (error) res.sendStatus(400).json(error)
    else res.status(200).json(user)
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