const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
// 匯入資料庫模組
const RestaurantData = require('./models/restaurants')
//匯入連線
require('./config/mogoose')
// 執行express
const app = express()
const bodyParser = require('body-parser')
const restaurants = require('./models/restaurants')
// method-override
const methodOverride=require('method-override')
// use
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
// 設置樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')





const routes = require('./routes/index.js')
// 將 request 導入路由器
app.use(routes)
// 基礎路由-首頁
// app.get('/', (req, res) => {
//   RestaurantData.find()
//     .lean()
//     .then((restaurants) => {
//       res.render('index', { restaurants })
//     })
//     .catch((error) => console.log(error))
// })

// 監聽app.js
app.listen(port, () => {
  console.log('app.js is listening')
})
