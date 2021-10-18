const express = require('express')
const router = express.Router()

const userAuth = require('../utils/userAuth')
const adminAuth = require('../utils/adminAuth')

const user = require('../controllers/user')

/* 
GET     /api/user/auth  - authenticate user
GET     /api/user/      - get all users (friends) for logged in user
GET     /api/user/:id   - get one user

POST    /api/user/login  - login user
POST    /api/user/      - add new user
POST    /api/user/:id   - update user

DELETE  /api/user/:id   - delete user
*/

router.get('/auth', userAuth, user.authenticate)
router.get('/', user.getAll)
router.get('/:id', user.getById)

router.post('/login', user.login)
router.post('/', user.addNew)
router.post('/:id', user.update)

router.delete('/user/:id', user.delete)

module.exports = router
