const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
const restaurants = require('../restaurants')
const defaultList = require('../../public/data/restaurant.json')
const len = defaultList.results.length
db.on('error', () => console.log('error'))
db.once('open', () => {
  console.log(len)
  for (let i = 0; i < len; i++) {
    restaurants.create({
      name: defaultList.results[i].name,
      name_en: defaultList.results[i].name_en,
      category: defaultList.results[i].category,
      image: defaultList.results[i].image,
      location: defaultList.results[i].location,
      phone: defaultList.results[i].phone,
      google_map: defaultList.results[i].google_map,
      rating: defaultList.results[i].rating,
      description: defaultList.results[i].description
    })
  }
  console.log('Database connecting')
})
