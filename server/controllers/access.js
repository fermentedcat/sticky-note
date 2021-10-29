const Access = require('../models/Access')

exports.getAll = (req, res, next) => {
  Access.find()
    .then((accesses) => {
      if (!accesses) res.sendStatus(404)
      else res.status(200).json(accesses)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}

exports.getById = (req, res, next) => {
  // TODO: check req.user.role === admin || user id === stack owner
  const id = req.params.id
  Access.findById(id)
    .then((access) => {
      if (!access) res.sendStatus(404)
      else res.status(200).json(access)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}

exports.addNew = async (req, res, next) => {
  const data = req.body
  try {
    const access = await new Access(data).save()
    res.status(201).json(access)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.update = (req, res, next) => {
  // TODO: check req.user.role === admin || user id === this user || user id === stack owner

  const id = req.params.id
  const data = req.body
  Access.findByIdAndUpdate(id, data, { new: true })
    .then((access) => {
      res.status(201).json(access)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}

exports.delete = (req, res, next) => {
  // TODO: check req.user.role === admin || req user id === this user || req user id === stack owner
  const id = req.params.id
  Access.findByIdAndDelete(id)
    .then((access) => {
      if (!access) res.sendStatus(404)
      else res.sendStatus(204)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}
