const express=require('express')
const router=express.Router()
const RestaurantData = require('../../models/restaurants')

// 前往新增餐廳表單
router.get('/new', (req, res) => {
  res.render('new')
})
// 新增單筆餐廳
router.post('', (req, res) => {
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
router.get('/:id', (req, res) => {
  const id = req.params.id
  RestaurantData.findById(id)
    .lean()
    .then((restaurants) => res.render('show', { restaurants }))
    .catch((error) => console.log(error))
})
// 前往修改單筆資料之頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  RestaurantData.findById(id)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch((error) => console.log(error))
})
// 修改單筆資料
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  RestaurantData.findById(id)
    .then((restaurants) => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
//搜尋
router.post('/search',(req,res)=>{
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
// router.use()
module.exports=router