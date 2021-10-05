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
  .then(data => {
    res.status(200).json(data)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.getById = (req, res, next) => {
  User.findById(req.params.id)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.addNew = (req, res, next) => {
  new User({
    firstName: 'Maja',
    lastName: 'Thunberg',
    username: 'catsoup',
    email: 'majaneko@gmail.com',
    password: 'secret',
  })
  .save()
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}