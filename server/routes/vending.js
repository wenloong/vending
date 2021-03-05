const router = require('express').Router()
let Vending = require('../models/vending.model')

router.route('/').get((req, res) => {
  Vending.find()
    .then(vendings => res.json(vendings))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
  try {
    const { id } = req.params

    Vending.findById(id)
      .then(vendings => res.json(vendings))
      .catch(err => res.status(400).json('Error: ' + err))
  } catch (err) {
    console.error(err)
  }
})

router.route('/add').post((req, res) => {
  try {
    const { location, money, drinks } = req.body

    const newVending = new Vending({ location, money, drinks })

    newVending.save()
      .then(() => res.json('Vending Machine Added'))
      .catch(err => res.status(400).json('Error: ' + err))
  } catch (err) {
    console.error(err.message)
  }
})

router.route('/update/:vid').put((req, res) => {
  try {
    const { vid } = req.params

    Vending.findById(vid)
      .then(vending => {
        const { location, money, drinks } = req.body

        vending.location = location
        vending.money = money
        vending.drinks = drinks

        vending.save()
          .then(() => res.json(`Updated Vending Machine ${ vid }`))
          .catch(err => res.status(400).json('Error: ' + err))
      })
    .catch(err => res.status(400).json('Error: ' + err))
  } catch (err) {
    console.error(err.message)
  }
})

router.route('/delete/:vid').delete((req, res) => {
  try {
    const { vid } = req.params

    Vending.findByIdAndDelete(vid)
      .then(vending => res.json(vending))
      .catch(err => res.status(400).json('Error: ' + err))
  } catch (err) {
    console.error(err)
  }
})

router.route('/:vid/purchase/:did').put((req, res) => {
  const { vid, did } = req.params

  try {
    Vending.updateOne(
      { _id: vid, 'drinks._id': did },
      { $inc: { 'money': 1, 'drinks.$.sodaLeft': -1 }}
    )
      .then(vending => res.json(vending))
      .catch(err => res.status(400).json('Error: ' + err))

  } catch (err) {
    console.error(err)
  }
})

router.route('/:vid/refill/:did').put((req, res) => {
  const { vid, did } = req.params

  try {
    Vending.updateOne(
      { _id: vid, 'drinks._id': did },
      { $inc: { 'drinks.$.sodaLeft': 10 }}
    )
      .then(vending => res.json(vending))
      .catch(err => res.status(400).json('Error: ' + err))
  } catch (err) {
    console.error(err)
  }
})

module.exports = router