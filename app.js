const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const exphbs = require('express-handlebars')
const port = 3000
const bodyParser = require('body-parser')
const db = require('./models')
const Todo = db.Todo
const User = db.User
const flash = require('connect-flash')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(
  session({
    secret: 'purrup',
    resave: 'false',
    saveUninitialized: ' false',
  })
)

app.use(express.static('public'))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use(flash())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))
app.use('/todos', require('./routes/todo'))
app.use('/auth', require('./routes/auths'))

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`App is running on localhost:${port}`)
})
