const User = require('../models/User')

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
    if (!user) {
      res.sendStatus(404)
    } else {
      res.status(200).json(user)
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.addNew = (req, res, next) => {
  const data = req.body
  new User(data)
  .save()
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}