const Todo = require('../models/Todo')
const Access = require('../models/Access')

/*
GET     /api/todo/      - get all todo items for logged in user
GET     /api/todo/:id   - get one todo item
POST    /api/todo/      - add new todo item
POST    /api/todo/:id   - update todo item
DELETE  /api/todo/:id   - delete todo item
*/

exports.getAll = async (req, res, next) => {
  const { userId, role } = req.user

  if (role === 'admin') {
    try {
      // find all todos
      const todos = await Todo.find()
      res.status(200).json(todos)
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    try {
      // find user's stack accesses
      const accesses = await Access.find({ 'user._id': userId })
      const accessArr = accesses.map((access) => access.stack)
      // find todo lists matching those stacks created by user
      console.log(accessArr)
      const todos = await Todo.find({
        $or: [{ stack: { $in: accessArr } }, { creator: userId }]
      })
      console.log(todos)
      res.status(200).json(todos)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

exports.getById = (req, res, next) => {
  const id = req.params.id
  Todo.findById(id)
    .then((todo) => {
      if (!todo) res.sendStatus(404)
      else res.status(200).json(todo)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}

exports.addNew = (req, res, next) => {
  const { userId } = req.user
  const data = req.body

  new Todo({ ...data, creator: userId })
    .save()
    .then((todo) => {
      res.status(201).json(todo)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}

exports.update = (req, res, next) => {
  const id = req.params.id
  const data = req.body
  Todo.findByIdAndUpdate(id, data, { new: true })
    .then((todo) => {
      res.status(201).json(todo)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}

exports.delete = (req, res, next) => {
  const id = req.params.id
  Todo.findByIdAndDelete(id)
    .then((todo) => {
      if (!todo) res.sendStatus(404)
      else res.status(200).send(id)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}
