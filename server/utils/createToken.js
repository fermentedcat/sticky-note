const jwt = require('jsonwebtoken')

module.exports = (user) => {
  const token = jwt.sign({
    username: user.username,
    userId: user._id,
    role: user.role
  }, process.env.TOKEN_KEY, {
    expiresIn: process.env.TOKEN_EXPIRATION
  })
  return token
} 