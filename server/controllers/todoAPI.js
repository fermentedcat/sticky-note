const Todo = require('../models/Todo')

/* 
GET     /api/todo/      - get all todo items for logged in user
GET     /api/todo/:id   - get one todo item
POST    /api/todo/      - add new todo item
POST    /api/todo/:id   - update todo item
DELETE  /api/todo/:id   - delete todo item
*/

exports.getAll = (req, res, next) => {
  Todo.find()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.getById = (req, res, next) => {
  Todo.findById(req.params.id)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.addNew = (req, res, next) => {
  new Todo({
    title: 'Hej',
    body: 'Hallå hallå'
  })
  .save()
  .then(todo => {
    res.status(201).json(todo)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

exports.update = (req, res, next) => {
  Todo.findByIdAndUpdate(req.params.id,
    {
      title: 'Hej',
      body: 'Hallå hallå'
    }
  )
  .save()
  .then(todo => {
    res.status(201).json(todo)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}