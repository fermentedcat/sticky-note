const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { CustomError, InternalError } = require('../utils/error')

const AccessSchema = new Schema({
  stack: {
    type: Schema.Types.ObjectId,
    ref: 'Stack'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

// PRE VALIDATE:

// check if matching access doc already exists when saving new access
AccessSchema.pre('validate', async function (next, done) {
  try {
    const access = await this.constructor.findOne({
      stack: this.stack,
      user: this.user
    })
    if (access) {
      const err = new CustomError(
        'user',
        'User already has access to this stack.'
      )
      next(err)
    }
    next()
  } catch (error) {
    const err = new InternalError(error)
    next(err)
  }
})

module.exports = mongoose.model('Access', AccessSchema)
