const Cart = require('../models/cart.model')
const Order = require('../models/order.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')
const initializePayment = require('./payment.service')

const PlaceOrder = async(userId) => {
    const user = await User.findById(userId)

    if(!user){
        throw new error ('User not found ')
    }

    if(!user.address || !user.phone){
        throw new error('Please update your address before placing order')
    }

    const cartItems = await Cart.find({userId}).populate('productId')

    if(!cartItems.length){
        throw new error('Your cart is empty')
    }

    const totalAmount = cartItems.reduce((sum, item) => {
        const price = item.productId.price || 0
        return sum + price * item.quantity
    }, 0)

    //prepare payment data for flutterwave 

    const paymentData = {
        tx_ref: `tx-${Date.now()}`,
        amount: totalAmount,
        currency: "NGN",
        redirect_url: "https://spellahub.com",
        customer: {
            email: user.email,
            phoneNumber: user.phone,
            name: user.fullname
        },
        customization: {
            title: 'Order Payment',
            description: 'Payments for items in cart'
        }
    }

    const paymentResponse = await initializePayment(paymentData)

    const order = await Order.create({
        userId,
        products: cartItems.map((item) => {
            productId: item.productId._id,
            quantity; item.quantity,
            price; item.productId.price
        }),

        totalAmount,
        paymentRef: paymentData.tx_ref,
        status: 'pending'
    })

    return{
        order,
        paymentLink: paymentResponse.data.link
    }
}



module.exports = PlaceOrder