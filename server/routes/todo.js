const express = require('express')
const router = express.Router()

const userAuth = require('../utils/userAuth')
const adminAuth = require('../utils/adminAuth')

const todoAPI = require('../controllers/todoAPI')

/* 
GET     /api/todo/      - get all todos for logged in user
GET     /api/todo/:id   - get one todo

POST    /api/todo/      - add new todo
POST    /api/todo/:id   - update todo

DELETE  /api/todo/:id   - delete todo
*/

router.get('/', todoAPI.getAll)
router.get('/:id', todoAPI.getById)

router.post('/', todoAPI.addNew)
router.post('/:id', todoAPI.update)

router.delete('/todo/:id', todoAPI.delete)

module.exports = router
