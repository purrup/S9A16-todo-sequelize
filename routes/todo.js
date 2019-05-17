const express = require('express')
const router = express.router()
const db = require('./models')
const Todo = db.Todo
const User = db.User
const { authenticated } = require('../config/auth')

// 列出全部 Todo
router.get('/', authenticated, (req, res) => {
  res.send('列出所有 Todo')
})

//前往新增todo頁面
router.get('/new', authenticated, (req, res) => {
  res.send('新增 Todo 頁面')
})

// 顯示一筆 Todo 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  res.send('顯示一筆 Todo')
})

//新增todo
router.post('/new', authenticated, (req, res) => {
  res.send('new')
})
// 前往修改todo頁面
router.get('/:id', authenticated, (req, res) => {
  res.send('修改 Todo 頁面')
})
// 修改todo
router.get('/:id', authenticated, (req, res) => {
  res.send('edit complete')
})

// 刪除todo
router.delete('/:id', authenticated, (req, res) => {
  res.send('removed')
})

module.exports = router
