const express = require('express')
const router = express.Router()

const userAuth = require('../utils/userAuth')
// const adminAuth = require('../utils/adminAuth')

const todo = require('../controllers/todo')

/*
GET     /api/todo/      - get all todos for logged in user
GET     /api/todo/:id   - get one todo

POST    /api/todo/      - add new todo
POST    /api/todo/:id   - update todo

DELETE  /api/todo/:id   - delete todo
*/

router.get('/', userAuth, todo.getAll)
router.get('/:id', userAuth, todo.getById)

router.post('/', userAuth, todo.addNew)
router.post('/:id', userAuth, todo.update)

router.delete('/:id', userAuth, todo.delete)

module.exports = router
