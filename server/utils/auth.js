module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      const error = {
        status: 401,
        message: 'Not authenticated.'
      }
      return next(error)
    }
  }
}