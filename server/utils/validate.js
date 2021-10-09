exports.string = (value) => {
  if (typeof value === 'string') {
    return value.trim() !== ''
  }
  return false
}

exports.password = (value) => {
  if (typeof value === 'string') {
    return value.trim().length >= 6
  }
  return false
}

exports.email = (value) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(value).toLowerCase())
}