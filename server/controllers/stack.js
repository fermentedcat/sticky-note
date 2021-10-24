const Stack = require('../models/Stack')
const Access = require('../models/Access')
const Todo = require('../models/Todo')
const User = require('../models/User')
const mongoose = require('mongoose')

exports.getAll = async (req, res, next) => {
  const { userId, role } = req.user

  try {
    // get all if admin
    if (role === 'admin') {
      const stacks = await Stack.find()
      res.status(200).json(stacks)
    }

    // make array of and find stacks user has access to (or is owner of)
    const accesses = await Access.find({ 'user._id': userId })
    const accessArr = accesses.map((access) => access.stack)
    const stacks = await Stack.find({
      $or: [{ _id: { $in: accessArr } }, { owner: userId }]
    })

    res.status(200).json(stacks)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getBySlug = async (req, res, next) => {
  const slug = req.params.slug
  const { userId, role } = req.user

  try {
    const stack = await Stack.findOne({ slug: slug })
    if (!stack) {
      res.sendStatus(404)
    } else {
      // check if user has access by invite
      const accesses = await Access.find({ stack: stack._id })
      const hasAccess = accesses.some((doc) => doc.user._id == userId)

      if (stack.owner != userId && role !== 'admin' && !hasAccess) {
        res.sendStatus(401)
      } else {
        // find stack's todo lists
        const todos = await Todo.find({ stack: stack._id })

        res.status(200).json({ stack, todos })
      }
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.addNew = (req, res, next) => {
  const { title, description } = req.body
  const { userId } = req.user
  const owner = mongoose.Types.ObjectId(userId)

  new Stack({ title: title, description: description, owner: owner })
    .save()
    .then((stack) => {
      res.status(201).json(stack)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}

exports.update = (req, res, next) => {
  // TODO: check req.user.role === admin ||  user id === stack owner || Stack user id ≈≈≈ req user id

  const id = req.params.id
  const data = req.body
  Stack.findByIdAndUpdate(id, data, { new: true })
    .then((stack) => {
      res.status(201).json(stack)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}

exports.delete = (req, res, next) => {
  // TODO: check req.user.role === admin || req user id === stack owner
  const id = req.params.id
  Stack.findByIdAndDelete(id)
    .then((stack) => {
      if (!stack) res.sendStatus(404)
      else res.sendStatus(204)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}
