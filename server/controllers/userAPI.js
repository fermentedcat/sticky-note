const User = require('../models/User')
const passport = require('passport')
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

exports.addNew = (req, res, next) => {
  const {
    fullName,
    username,
    email,
    password
  } = req.body

  let errors = []

  // Check if email/username already exists
  User.findOne({ email: email })
  .then(user => {
    if (user) {
      errors.push({ message: 'Email is already registered.' })
    }

    User.findOne({ username: username })
    .then(user => {
      if (user) {
        errors.push({ message: 'Username is already taken.' })
      }
      // Check fields are filled in correctly
      if (!fullName || fullName.trim() === '' || 
          !username || username.trim() === '' || 
          !password || password.trim() === '' ||
          !email || email.trim() === '') {
        errors.push({ message: 'Please fill out all fields.' })
      }
      if (password.length < 6) {
          errors.push({ message: 'Password needs to be at least 6 characters long.' })
      }

      if (errors.length > 0) {
        res.send(400).json(errors)
      } else {
        const newUser = new User({
          fullName,
          username,
          email,
          password
        })

        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            errors.push({ message: 'An error occurred.'})
            res.send(500).json(errors)
          }

          // Save new user with encrypted password
          newUser.password = hash
          newUser.save()
          .then(addedUser => {
            // Authenticate user upon register
            passport.authenticate('local')(req, res, () => {
              res.status(201).json(addedUser)
            })
          })
          .catch(error => {
            errors.push({ message: 'An error occurred.'})
            res.send(500).json(errors)
          })
        })
      }
    })
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