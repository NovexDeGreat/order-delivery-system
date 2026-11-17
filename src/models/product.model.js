const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name:{
        type: String,
        require:[true, "Product name is required"],
    },
    price: {
        type: Number,
        require:[true, "Product price is required"]
    },
    description: {
         type: String,
         require:[true, "Product description is required"]
    },
    category: {
         type: String,
         require:[true, "Product category is required"]
    },
    inStock: {
        type: Number,
        require:[true, "Product stock status is required"]
    },
    image: {
        type: String,
        require:[true, "Product image is required"]
    }
})

const Product = mongoose.model('Product', productSchema);
    
module.exports = Product;