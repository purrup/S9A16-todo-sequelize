const express = require('express')
const app = express()
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const exphbs = require('express-handlebars')
const port = 3000
const bodyParser = require('body-parser')
const db = require('./models')
const Todo = db.Todo
const User = db.User

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

app.get('/', (req, res) => {
  res.send('home')
})

app.use('/users', require('./routes/user'))

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`App is running on localhost:${port}`)
})
