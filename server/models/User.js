const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const validate = require('../utils/validate')
const { CustomError } = require('../utils/error')

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      validate: [
          validate.string, 
          'Please enter a valid name.'
        ],
    },
    username: {
      type: String,
      required: true,
      validate: [
          validate.string, 
          'Please enter a valid username.'
        ],
    },
    email: {
      type: String,
      required: true,
      validate: [
          validate.email, 
          'Please enter a valid email'
        ],
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: [
        validate.password,
        'Password needs to be at least 6 characters.',
      ],
    },
    photo: {
      type: String,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
)

// PRE VALIDATE:

// check if email is registered
UserSchema.pre('validate', function (next, done) {
  this.constructor.findOne({ email: this.email })
  .then(user => {
    if (user) {
      const error = new CustomError(
        'email',
        'This email is already registered.'
      )
      next(error)
    }
    next()
  })
})

// check if username is taken
UserSchema.pre('validate', function (next, done) {
  this.constructor.findOne({ username: this.username })
  .then(user => {
    if (user) {
      const error = new CustomError('username', 'This username is taken.')
      next(error)
    }
    next()
  })
})

// PRE SAVE:

// hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const saltRounds = parseInt(process.env.SALT_ROUNDS)
  const hash = await bcrypt.hash(this.password, saltRounds)
  this.password = hash
  next()
})

module.exports = mongoose.model('User', UserSchema)
