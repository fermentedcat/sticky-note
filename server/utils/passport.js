const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    { usernameField: 'username' },
    (username, password, done) => {
      User.findOne({$or: [{ email: username }, { username: username }]},
        (error, user) => {
          if (error) {
            return done(error)
          }
          if (!user) {
            return(null, false)
          }
          
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
              throw error
            }
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false)
            }
          })
      })
      .catch(error => done(error))
    }
  ))
  
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user._id)
    })
  })
}