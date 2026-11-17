const express = require('express');
//const router = express.Router();
const {createProduct, getAllProducts, getProductById, updateProduct} = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware')
const adminOnly = require('../middleware/admin.middle')
const upload = require('../middleware/cloudinary.middleware')

const router = express.Router();





router.post('/create',auth, adminOnly, upload.single('image'), createProduct);

router.get("/create-poduct", getAllProducts)

router.get('/get-product/:id', getProductById);

router.patch('/update-product/:id', auth, adminOnly, upload.single('image'), updateProduct)


module.exports = router;
