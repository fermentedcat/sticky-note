const express = require('express')
const router = express.Router()

const userAuth = require('../utils/userAuth')
const adminAuth = require('../utils/adminAuth')

const access = require('../controllers/access')

/*
GET     /api/access/      - get all accesses (admin)
GET     /api/access/:id   - get one access

POST    /api/access/      - add new access
POST    /api/access/:id   - update access

DELETE  /api/access/:id   - delete access
*/

router.post('/', access.addNew)

module.exports = router
