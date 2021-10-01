const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
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
}, {
  timestamps: true,
})

module.exports = mongoose.model('Todo', TodoSchema)