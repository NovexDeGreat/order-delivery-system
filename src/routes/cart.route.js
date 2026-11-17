const router = require('express').Router()
const  auth   = require('../middleware/auth.middleware')

const addToCart = require('../controllers/cart.controller')

router.post('/add-to-cart', auth, addToCart)

module.exports = router