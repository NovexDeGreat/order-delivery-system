const Cart = require("../models/viewcart.model");

// GET USER CART
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


// DELETE PARTICULAR PRODUCT FROM CART
const deleteCartItem = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const itemExists = cart.items.some(
    (item) => item.product.toString() === productId
  );

  if (!itemExists) {
    throw new Error("Product not found in cart");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  return cart;
};


// EXPORT FUNCTIONS
module.exports = {
  getUserCart,
  deleteCartItem
};