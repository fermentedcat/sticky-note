class CustomError extends Error {
  constructor (reference, message) {
    super(message)

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor)

    this.reference = reference
    this.errorMessage = message
  }
}

class InternalError extends Error {
  constructor (error) {
    super('An unexpected error occurred.')

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor)

    this.reference = 'internal'
    this.errorMessage = 'An unexpected error occurred.'
    this.content = error
  }
}

module.exports = {
  CustomError,
  InternalError
}
