const mongoose = require('mongoose')

const Schema = mongoose.Schema
const sodaSchema = mongoose.model('Soda').schema

const vendingSchema = new Schema({
  location: {
    type: String,
    required: true
  },
  money: {
    type: Number,
    required: true
  },
  drinks: [{
    soda: sodaSchema,
    sodaLeft: Number,
  }]
})

const Vending = mongoose.model('Vending', vendingSchema)

module.exports = Vending