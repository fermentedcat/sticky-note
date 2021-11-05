const mongoose = require('mongoose')
const Schema = mongoose.Schema

const validate = require('../utils/validate')

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: [
      validate.string,
      'Invalid title.'
    ]
  },
  stack: {
    type: Schema.Types.ObjectId,
    ref: 'Stack'
  },
  markdown: {
    type: String
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  lastEditBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  lastEdit: {
    type: String
  }
}, {
  timestamps: true
})

// PRE VALIDATE:

// set default lastEditBy to creator
TodoSchema.pre('validate', function (next, done) {
  // sanitize markdown into sanitizedHtml
  if (this.isModified('lastEditBy')) {
    return next()
  }
  this.lastEditBy = this.creator
  next()
})

module.exports = mongoose.model('Todo', TodoSchema)
