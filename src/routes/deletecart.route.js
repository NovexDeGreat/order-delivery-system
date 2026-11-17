const express = require("express");
const router = express.Router();

const {
  getCart,
  deleteCart
} = require("../controllers/deletecart.controller");

const auth = require("../middleware/auth.middleware");


// DELETE PARTICULAR PRODUCT FROM CART
router.delete("/delete-cart", auth, deleteCart);


module.exports = router;