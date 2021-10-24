const express = require('express')
const router = express.Router()

const userAuth = require('../utils/userAuth')
const adminAuth = require('../utils/adminAuth')

const todo = require('../controllers/todo')

/*
GET     /api/todo/      - get all todos for logged in user
GET     /api/todo/:id   - get one todo

POST    /api/todo/      - add new todo
POST    /api/todo/:id   - update todo

DELETE  /api/todo/:id   - delete todo
*/

router.get('/', todo.getAll)
router.get('/:id', todo.getById)

router.post('/', todo.addNew)
router.post('/:id', todo.update)

router.delete('/:id', todo.delete)

module.exports = router
