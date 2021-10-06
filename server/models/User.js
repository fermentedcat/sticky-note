const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        populate: false
    },
    photo: {
        type: String
    },
    friends: [{
      type: Schema.Types.ObjectId, 
      ref: 'User'
    }],
}, {
  timestamps: true,
})

module.exports = mongoose.model('User', UserSchema)