const cartService = require("../service/viewcart.service");

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

module.exports = { getCart };