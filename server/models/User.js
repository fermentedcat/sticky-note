const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validate = require('../utils/validate')


const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        validate: [validate.string, 'Please enter a valid name.']
    },
    username: {
        type: String,
        required: true,
        validate: [validate.string, 'Please enter a valid username.']
    },
    email: {
        type: String,
        required: true,
        validate: [validate.email, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        validate: [validate.password, 'Password needs to be at leas 6 characters long.']
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

// hash password
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next()
    }
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

module.exports = mongoose.model('User', UserSchema)