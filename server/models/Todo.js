const mongoose = require('mongoose')
const Schema = mongoose.Schema

const validate = require('../utils/validate')

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: [
      validate.string,
      'Please enter a valid name.'
    ]
  },
  stack: {
    type: Schema.Types.ObjectId,
    ref: 'Stack'
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  archived: {
    type: Boolean,
    required: false
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
