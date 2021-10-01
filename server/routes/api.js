const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const User = require('../models/User');


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

router.get('/', function(req, res, next) {
  res.end('api');
});

router.post('/todo', (req, res, next) => {
  new Todo({
    title: 'Hej',
    body: 'Hallå hallå'
  })
  .save()
  .then(todo => {
    res.status(201).json(todo)
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

router.post('/user', (req, res, next) => {
  new User({
    firstName: 'Maja',
    lastName: 'Thunberg',
    username: 'catsoup',
    email: 'majaneko@gmail.com',
    password: 'secret',
  })
  .save()
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

module.exports = router;
