const router = require('express').Router()
const auth = require('../middleware/auth.middleware')

const placeOrder = require('../controllers/order.controller')

router.post('/place-order', auth, placeOrder)

module.exports = router