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

app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})
