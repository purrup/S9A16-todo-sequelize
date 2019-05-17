const express = require('express')
const router = express.router()
const db = require('./models')
const Todo = db.Todo
const User = db.User
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  res.send('列出全部Todo')
})

module.exports = router
