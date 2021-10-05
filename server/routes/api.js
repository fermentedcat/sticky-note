const express = require('express')
const router = express.Router()

const userAPI = require('../controllers/userAPI')
const todoAPI = require('../controllers/todoAPI')

/* 
GET     /api/todo/      - get all todo items for logged in user
GET     /api/todo/:id   - get one todo item
POST    /api/todo/      - add new todo item
POST    /api/todo/:id   - update todo item
DELETE  /api/todo/:id   - delete todo item

GET     /api/user/      - get all users (friends) for logged in user
GET     /api/user/:id   - get one user
POST    /api/user/      - add new user
POST    /api/user/:id   - update user
DELETE  /api/user/:id   - delete user
*/

router.get('/todo', todoAPI.getAll)
router.get('/user', userAPI.getAll)

router.post('/todo', todoAPI.addNew)
router.post('/user', userAPI.addNew)

module.exports = router
