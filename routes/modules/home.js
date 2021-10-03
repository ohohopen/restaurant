const express=require('express')
const router=express.Router()
const RestaurantData = require('../../models/restaurants')
// 基礎路由-首頁
router.get('/', (req, res) => {
  RestaurantData.find()
    .lean()
    .then((restaurants) => {
      res.render('index', { restaurants })
    })
    .catch((error) => console.log(error))
})
module.exports=router