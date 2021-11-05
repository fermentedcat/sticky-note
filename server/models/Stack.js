const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slugify = require('slugify')
const addNextSlugId = require('../utils/addNextSlugId')
const validate = require('../utils/validate')

const StackSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      validate: [validate.string, 'Title invalid.']
    },
    slug: {
      type: String,
      unique: true
    },
    description: {
      type: String,
      default: 'This is a collection of todo lists'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    archived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

StackSchema.pre('save', async function (next, done) {
  // make url-friendly slug from title
  if (this.title) {
    const slug = slugify(this.title, { lower: true, strict: true })
    try {
      this.slug = await addNextSlugId(slug, this.constructor)
      next()
    } catch (error) {
      next(error)
    }
  }
  next()
})

StackSchema.pre('findOneAndUpdate', async function (next, done) {
  // update url-friendly slug from title
  console.log(this)
  if (this._update.title) {
    const slug = slugify(this._update.title, {
      lower: true,
      strict: true
    })
    try {
      this._update.slug = await addNextSlugId(slug, this.model)
      next()
    } catch (error) {
      next(error)
    }
  }
  next()
})

module.exports = mongoose.model('Stack', StackSchema)
