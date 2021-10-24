const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(404).send('Please visit /api followed by /user, /todo, /stack or /access')
})

module.exports = router
