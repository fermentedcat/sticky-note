const express = require('express')
const router = express.Router()

const userAuth = require('../utils/userAuth')
const adminAuth = require('../utils/adminAuth')

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

GET     /api/user/auth  - authenticate user
POST    /api/user/login  - login user
*/

router.get('/todo', todoAPI.getAll)
router.get('/user', userAPI.getAll)

router.get('/user/auth', userAuth, userAPI.authenticate)

router.get('/todo/:id', todoAPI.getById)
router.get('/user/:id', userAPI.getById)

router.post('/user/login', userAPI.login)

router.post('/todo', todoAPI.addNew)
router.post('/user', userAPI.addNew)

router.post('/todo/:id', todoAPI.update)
router.post('/user/:id', userAPI.update)

router.delete('/todo/:id', todoAPI.delete)
router.delete('/user/:id', userAPI.delete)

module.exports = router
