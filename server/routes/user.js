const express = require('express')
const router = express.Router()

const userAuth = require('../utils/userAuth')
const adminAuth = require('../utils/adminAuth')

const userAPI = require('../controllers/userAPI')

/* 
GET     /api/user/auth  - authenticate user
GET     /api/user/      - get all users (friends) for logged in user
GET     /api/user/:id   - get one user

POST    /api/user/login  - login user
POST    /api/user/      - add new user
POST    /api/user/:id   - update user

DELETE  /api/user/:id   - delete user
*/

router.get('/auth', userAuth, userAPI.authenticate)
router.get('/', userAPI.getAll)
router.get('/:id', userAPI.getById)

router.post('/login', userAPI.login)
router.post('/', userAPI.addNew)
router.post('/:id', userAPI.update)

router.delete('/user/:id', userAPI.delete)

module.exports = router
