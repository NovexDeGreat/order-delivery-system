const Cart = require("../models/viewcart.model");

// CLEAR ENTIRE CART
const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = [];

    await cart.save();

    return cart;
};


module.exports = {
    clearCart
};