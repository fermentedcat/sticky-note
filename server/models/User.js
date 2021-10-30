const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const validate = require('../utils/validate')
const { CustomError, InternalError } = require('../utils/error')

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      validate: [validate.string, 'FullName invalid.']
    },
    username: {
      type: String,
      required: true,
      validate: [validate.string, 'Username invalid.']
    },
    email: {
      type: String,
      required: true,
      validate: [validate.email, 'Email invalid']
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: [validate.password, 'Password invalid.']
    },
    pinnedTodos: {
      type: [Schema.Types.ObjectId],
      ref: 'Todo'
    },
    photo: {
      type: String
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true
  }
)

// PRE VALIDATE:

// check if email is registered
UserSchema.pre('validate', function (next, done) {
  this.constructor.findOne({ email: this.email }).then((user) => {
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
  this.constructor
    .findOne({ username: this.username })
    .then((user) => {
      if (user) {
        const error = new CustomError('username', 'This username is taken.')
        next(error)
      }
      next()
    })
    .catch(() => {
      const err = new InternalError('internal', 'Database error.')
      next(err)
    })
})

// check if username is taken
UserSchema.pre('findOneAndUpdate', function (next, done) {
  if (this._update.username) {
    this.model
      .findOne({ username: this._update.username })
      .then((user) => {
        if (user && user._id != this._update._id) {
          const error = new CustomError('username', 'This username is taken.')
          next(error)
        }
        next()
      })
      .catch(() => {
        const err = new InternalError('internal', 'Database error.')
        next(err)
      })
  }
  next()
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
