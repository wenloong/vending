const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sodaSchema = new Schema({
  productName: {
    type: String,
    required: true,
    minLength: 1
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  maxQuantity: {
    type: Number,
    required: true
  }
})

const Soda = mongoose.model('Soda', sodaSchema)

module.exports = Soda