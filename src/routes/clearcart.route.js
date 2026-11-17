const express = require("express");
const router = express.Router();

const {
    clearCart
} = require("../controllers/clearcart.controller");

const auth = require("../middleware/auth.middleware");

// CLEAR ENTIRE CART
router.delete("/clear", auth, clearCart);


module.exports = router;