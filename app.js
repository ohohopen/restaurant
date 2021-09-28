const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
// 資料庫連線
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => console.log('error'))
db.once('open', () => console.log('Database connecting'))
// 匯入資料庫模組
const Todo = require('./models/todo')
// 執行express
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
// 設置樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
// 基礎路由-首頁
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then((todos) => {
      res.render('index', { todos })
    })
    .catch((error) => console.log(error))
})
// 前往新增餐廳表單
app.get('/todos/new', (req, res) => {
  res.render('new')
})
// 新增單筆餐廳
app.post('/todos/new', (req, res) => {
  const name = req.body.name
  const nameEn = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const googleMap = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  Todo.create({
    name,
    name_en: nameEn,
    category,
    image,
    location,
    phone,
    google_map: googleMap,
    rating,
    description
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
// 瀏覽單筆資料
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then((todos) => res.render('show', { todos }))
    .catch((error) => console.log(error))
})
// 前往修改單筆資料之頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then((todos) => res.render('edit', { todos }))
    .catch((error) => console.log(error))
})
// 修改單筆資料
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const nameEn = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const googleMap = req.body.google_map
  const rating = req.body.rating[0]
  const description = req.body.description
  return Todo.findById(id)
    .then((todos) => {
      todos.name = name
      todos.name_en = nameEn
      todos.category = category
      todos.image = image
      todos.location = location
      todos.phone = phone
      todos.google_map = googleMap
      todos.rating = rating
      todos.description = description
      todos.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
// 刪除單筆資料
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
// 監聽app.js
app.listen(port, () => {
  console.log('app.js is listening')
})
