const express = require('express')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(
  session({
    secret: 'purrup',
    resave: 'false',
    saveUninitialized: ' false',
  })
)

app.get('/', (req, res) => {
  res.send('hello world!')
})

// 登入頁面
app.get('/users/login', (req, res) => {
  res.render('login')
})
// 登入檢查
app.post('/users/login', (req, res) => {
  res.send('login')
})

// 註冊頁面
app.get('/users/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
app.post('/users/login', (req, res) => {
  res.send('register')
})

// 登出
app.get('/users/logout', (req, res) => {
  res.send('logout')
})

app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})
