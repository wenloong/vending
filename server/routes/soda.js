const router = require('express').Router()
let Soda = require('../models/soda.model')

router.route('/').get((req, res) => {
  Soda.find()
    .then(sodas => res.json(sodas))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
  Soda.findById(req.params.id)
    .then(soda => res.json(soda))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const { productName, description, cost, maxQuantity } = req.body.soda
  console.log( req.body )

  const newSoda = new Soda({ productName, description, cost, maxQuantity })

  newSoda.save()
    .then(() => res.json('Soda added'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:sid').put((req, res) => {
  try {
    const { sid } = req.params

    Soda.findById(sid)
      .then(soda => {
        const { productName, description, cost, maxQuantity } = req.body

        soda.productName = productName
        soda.description = description
        soda.cost = cost
        soda.maxQuantity = maxQuantity

        soda.save()
          .then(() => res.json('Updated Soda'))
          .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
  } catch (err) {
    console.error(err.message)
  }
})

router.route('/delete/:sid').delete((req, res) => {
  try {
    const { sid } = req.params

    Soda.findByIdAndDelete(sid)
      .then(soda => res.json(soda))
      .catch(err => res.status(400).json('Error: ' + err))
  } catch (err) {
    console.error(err)
  }
})

module.exports = router