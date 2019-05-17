const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo
const User = db.User
const { authenticated } = require('../config/auth')

// 列出全部 Todo
// router.get('/', authenticated, (req, res) => {
//   res.send('列出所有 Todo')
// })

//前往新增todo頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

//新增todo
router.post('/', authenticated, (req, res) => {
  console.log('# 新增一筆 Todo ')
  Todo.create({
    name: req.body.name,
    done: false,
    UserId: req.user.id,
  })
    .then(todo => {
      return res.redirect('/')
    })
    .catch(err => {
      return res.status(422).json(err)
    })
})

// 顯示一筆 Todo 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  console.log('# 顯示一筆 Todo ')
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.error()
      }
      Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id,
        },
      }).then(todo => {
        return res.render('detail', { todo })
      })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

// 前往修改todo頁面
router.get('/:id/edit', authenticated, (req, res) => {
  console.log('# 請求「修改 todo 頁面」')
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.error()
      }
      Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id,
        },
      }).then(todo => {
        return res.render('edit', { todo })
      })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})
// 修改todo
router.put('/:id', authenticated, (req, res) => {
  console.log('# 修改 todo ')
  Todo.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id,
    },
  }).then(todo => {
    todo.name = req.body.name
    if (req.body.done === 'on') {
      todo.done = true
    } else {
      todo.done = false
    }
    todo
      .save()
      .then(todo => {
        return res.redirect(`/todos/${req.params.id}`)
      })
      .catch(err => {
        return res.status(422).json(err)
      })
  })
})

// 刪除todo
router.delete('/:id/delete', authenticated, (req, res) => {
  console.log('# 刪除一筆 Todo ')
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.error()
      }
      Todo.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id,
        },
      }).then(todo => {
        return res.redirect('/')
      })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

module.exports = router
