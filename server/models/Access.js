const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('../utils/validate')
const { CustomError, InternalError } = require('../utils/error')

const AccessSchema = new Schema({
    stack: {
      type: Schema.Types.ObjectId, 
      ref: 'Stack'
    },
    user: {
      _id: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
      },
      email: {
        type: String,
        validate: [
          validate.email, 
          'Invalid email'
        ],
      }
    },
})

// PRE VALIDATE:

// check if matching access doc already exists when saving new access
AccessSchema.pre('validate', function (next, done) {
  this.constructor.findOne({ 
    $and: [
      {collection: this.collection}, 
      {$or: [
        {"user._id": this.user._id}, 
        {"user.email": this.user.email}
      ]}
    ] 
  })
  .then(access => {
    // if match on email, prevent duplicate doc
    if (access) {
      const err = new CustomError('user', 'User already has access to this collection.')
      next(err)
    }
    next()
  })
  .catch(() => {
    const err = new InternalError('internal', 'Database error.')
    next(err)
  })
})

module.exports = mongoose.model('Access', AccessSchema)