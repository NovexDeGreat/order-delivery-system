const Cart = require("../models/viewcart.model");

const getUserCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId })
    .populate("items.product");

  if (!cart) {
    return {
      items: [],
      totalPrice: 0
    };
  }

  const totalPrice = cart.items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  return {
    items: cart.items,
    totalPrice
  };
};

module.exports = { getUserCart };