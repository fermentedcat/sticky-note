exports.error = (err) => {
  const errors = {}

  // format mongoose model validation errors
  if (err.errors) {
    Object.entries(err.errors).forEach((error) => {
      errors.reference = error[0]
      errors.errorMessage = error[1].properties.message
    })
    return errors
  }
  return err
}
