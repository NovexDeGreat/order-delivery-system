const Product = require("../models/product.model");

const cloudinary = require("../config/cloudinary.config");

createProduct = async({name, description, price, category, inStock, image}) => {
    const uploadResult = await cloudinary.uploader.upload_stream(
         {resouce_type: 'image', folder: 'products'},
         async(error, result) => {
             if(error) {
                 throw new Error("Image upload failed")
             }

             const newProduct = new Product({
                 name,
                 description,
                 price,
                 category,
                 inStock,
                 image: result.secure_url
             });

             await newProduct.save()
             return newProduct
         }
    );

    uploadResult.end(image);
    return
}

const getAllProducts = async() => {
    return (await Product.find())
}

const getProductById = async(productId) => {
    return Product.findById(productId)
}

const updateProduct = async(productId, updateData) => {
    return Product.findByIdAndUpdate(productId, updateData, {
        new : true,
        runValidators : true
    })
}

module.exports = {createProduct, getAllProducts, getProductById, updateProduct }