const express = require('express')
const router = express.Router()

const userAuth = require('../utils/userAuth')
const adminAuth = require('../utils/adminAuth')

const user = require('../controllers/user')

/*
GET     /api/user/auth  - authenticate user
GET     /api/user/me   - get logged in user
GET     /api/user/pinned - get user's pinned todo lists
GET     /api/user/search/:string   - get all by part of username
GET     /api/user/      - get all users (friends) for logged in user
GET     /api/user/:id   - get one user

POST    /api/user/login  - login user
POST    /api/user/addPin  - add pinned
POST    /api/user/removePin  - remove pinned todo
POST    /api/user/      - add new user
POST    /api/user/:id   - update user

DELETE  /api/user/:id   - delete user
*/

router.get('/auth', userAuth, user.authenticate)
router.get('/me', userAuth, user.getLoggedInUser)
router.get('/pinned', userAuth, user.getPinnedTodos)
router.get('/search/:string', user.getAllByUsername)
router.get('/', adminAuth, user.getAll)
router.get('/:id', adminAuth, user.getById)

router.post('/login', user.login)
router.post('/addPin', userAuth, user.addTodoPin)
router.post('/removePin', userAuth, user.removeTodoPin)
router.post('/', user.addNew)
router.post('/:username', userAuth, user.update)

router.delete('/user/:id', userAuth, user.delete)

module.exports = router
