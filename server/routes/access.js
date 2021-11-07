const express = require('express')
const router = express.Router()

const userAuth = require('../utils/userAuth')
// const adminAuth = require('../utils/adminAuth')

const access = require('../controllers/access')

/*
POST    /api/access/              - add new access
DELETE  /api/access/my/:stackId   - delete own access
*/

router.post('/', userAuth, access.addNew)
router.delete('/my/:stackId', userAuth, access.deleteOwn)

module.exports = router
