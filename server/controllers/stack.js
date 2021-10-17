const Stack = require('../models/Stack')
const Access = require('../models/Access')
const Todo = require('../models/Todo')
const User = require('../models/User')

exports.getAll = (req, res, next) => {
  //TODO: check req.user.role === admin || user id === stack owner || access user id ≈≈≈ req user id
  Access.find()
  .then(accesses => {
    if (!accesses) res.sendStatus(404)
    else res.status(200).json(accesses)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.getAllByUserId = (req, res, next) => {
  //TODO: check req.user.role === admin || user id === stack owner || access user id ≈≈≈ req user id
  Access.find()
  .then(accesses => {
    if (!accesses) res.sendStatus(404)
    else res.status(200).json(accesses)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.getById = (req, res, next) => {
  //TODO: check req.user.role === admin || user id === stack owner || access user id ≈≈≈ req user id
  const id = req.params.id
  Access.findById(id)
  .then(access => {
    if (!access) res.sendStatus(404)
    else res.status(200).json(access)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.addNew = (req, res, next) => {
  // const data = req.body
  const data = {
    title: 'Favorites',
    owner: '616c428118648f7f8df5248c',
    description: 'some description'
  }
  new Stack(data)
  .save()
  .then(stack => {
    res.status(201).json(stack)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.update = (req, res, next) => {
  //TODO: check req.user.role === admin ||  user id === stack owner || access user id ≈≈≈ req user id

  const id = req.params.id
  const data = req.body
  Access.findByIdAndUpdate(
    id, 
    data, 
    { new: true }
  )
  .then(access => {
    res.status(201).json(access)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.delete = (req, res, next) => {
  //TODO: check req.user.role === admin || req user id === stack owner
  const id = req.params.id
  Access.findByIdAndDelete(id)
  .then((access) => {
    if (!access) res.sendStatus(404)
    else res.sendStatus(204)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}