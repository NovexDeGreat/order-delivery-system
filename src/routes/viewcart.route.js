const express = require("express");
const router = express.Router();

const { getCart } = require("../controllers/viewcart.controller");
const auth = require("../middleware/auth.middleware");

router.get("/view-cart", auth, getCart);

module.exports = router;