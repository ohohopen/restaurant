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
const RestaurantData = require('./models/restaurants')
// 執行express
const app = express()
const bodyParser = require('body-parser')
const restaurants = require('./models/restaurants')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
// 設置樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
// 基礎路由-首頁
app.get('/', (req, res) => {
  RestaurantData.find()
    .lean()
    .then((restaurants) => {
      res.render('index', { restaurants })
    })
    .catch((error) => console.log(error))
})
// 前往新增餐廳表單
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
// 新增單筆餐廳
app.post('/restaurants/new', (req, res) => {
  const name = req.body.name
  const nameEn = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const googleMap = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  RestaurantData.create({
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
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  RestaurantData.findById(id)
    .lean()
    .then((restaurants) => res.render('show', { restaurants }))
    .catch((error) => console.log(error))
})
// 前往修改單筆資料之頁面
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  RestaurantData.findById(id)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch((error) => console.log(error))
})
// 修改單筆資料
app.post('/restaurants/:id/edit', (req, res) => {
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
  console.log(name)
  RestaurantData.findById(id)
    .then((restaurants) => {
      console.log(id,name,image,rating)
      restaurants.name = name
      restaurants.name_en = nameEn
      restaurants.category = category
      restaurants.image = image
      restaurants.location = location
      restaurants.phone = phone
      restaurants.google_map = googleMap
      restaurants.rating = rating
      restaurants.description = description
      restaurants.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
// 刪除單筆資料
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  RestaurantData.findById(id)
    .then((restaurants) => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
//搜尋
app.post('/search',(req,res)=>{
  const keyword=req.body.keyword
  RestaurantData.find()
  .lean()
  .then(restaurants=>{
    const searchResult=restaurants.filter(item=>{
      return item.name.toLowerCase().includes(keyword)
    })
    res.render('index',{restaurants:searchResult,keyword:keyword})
  })
  .catch((error)=>console.log('err'))


})
// 監聽app.js
app.listen(port, () => {
  console.log('app.js is listening')
})
