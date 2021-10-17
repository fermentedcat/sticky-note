const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('../utils/validate')

const slugify = require('slugify')

const StackSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      validate: [validate.string, 'Title invalid.'],
    },
    slug: {
      type: String,
      unique: true
    },
    description: {
      type: String,
      default: "This is a collection of todo lists",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    archived: {
      type: Boolean,
      default: false
    },
    private: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

StackSchema.pre('save', function (next, done) {
  //make url-friendly slug from title
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

module.exports = mongoose.model('Stack', StackSchema)
