const express = require('express')
const router = express.Router()

const userAuth = require('../utils/userAuth')

const stack = require('../controllers/stack')

/*
GET     /api/stack/      - get all stacks for logged in user
GET     /api/stack/:id   - get one stack

POST    /api/stack/      - add new stack
POST    /api/stack/:id   - update stack

DELETE  /api/stack/:id   - delete stack
*/

router.get('/', userAuth, stack.getAll)
router.get('/:slug', userAuth, stack.getBySlug)

router.post('/', userAuth, stack.addNew)
router.post('/:id', userAuth, stack.update)

router.delete('/:id', userAuth, stack.delete)
module.exports = router
