const OrderService = require('../service/order.service')

const placeOrder = async(req, res) => {
    try{
        const userId = req.user._id

        const result = await OrderService.placeOrder(userId)

        res.status(201).json({
            message: 'Order initialized successfully.. Proceed to payment',
            date: result
        })
    }catch(error){
        console.error('Place order error:', error)
    }
}

module.exports = placeOrder