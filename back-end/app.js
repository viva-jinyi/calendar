const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')

const { sequelize }  = require('./models')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const scheduleRouter = require('./routes/schedule')
const birthdayRouter = require('./routes/birthday')

const app = express()

app.use(cors())
app.set('port', process.env.PORT || 5000)
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

sequelize.sync({force: false})
  .then(()=> {
    console.log('데이터베이스 연결 성공')
  })
  .catch(err => {
    console.error(err)
  })

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/schedule', scheduleRouter)
app.use('/birthday', birthdayRouter)


app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  // res.locals.message = err.message
  // res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}
  res.status(err.status || 500)
  // res.render('error')
  res.send(err)
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중')
})