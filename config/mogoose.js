// 資料庫連線
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => console.log('error'))
db.once('open', () => console.log('Database connecting'))
module.exports=db