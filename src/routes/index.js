const router = require('express').Router()


router.use('/auth', require('./auth.route'))
router.use('/user', require('./user.route'))
router.use('/product', require('./product.route'))
router.use('/cart', require('./cart.route'))
router.use("/cart", require('./viewcart.route'));
router.use("/cart", require('./deletecart.route'));
router.use("/cart", require('./clearcart.route'));
router.use("/order", require('./order.route'));

module.exports = router