const cartService = require("../service/deletecart.service");

// GET USER CART
const getCart = async (req, res) => {
  try {
    const cart = await cartService.getUserCart(req.user.id);

    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      cart
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// DELETE PARTICULAR PRODUCT FROM CART
const deleteCart = async (req, res) => {
  try {
    const cart = await cartService.deleteCartItem(
      req.user.id,
      req.params.productId
    );

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart
    });

  } catch (error) {
    const statusCode = error.message === "Cart not found" ||
      error.message === "Product not found in cart"
      ? 404
      : 500;

    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  getCart,
  deleteCart
};