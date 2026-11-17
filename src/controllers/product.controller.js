const productServices = require("../service/product.services")

const createProduct = async(req,res)=>{
    try{
        const {name, description, price, category, inStock} = req.body

        if(!name || !description || !price || !category || !inStock){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const image = req.file.buffer

        const product = await productServices.createProduct({name, description, price, category, inStock, image})

        
        console.log(product)

      return  res.status(201).json({
            message: "Product created successfully"
        })
        


    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}
        
      const getAllProducts = async(req, res) => {
        try{
            const products = await productServices.getAllProducts();

            res.status(200).json({message: 'Producy fetched successfully', products})

        }catch(error) {
            res.status(400).json({error: error.message})
        }
        
      }

      const getProductById = async(req, res) => {
        const productId = req.params.id;
        try {
            const product = await productServices.getProductById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product fetched successfully', product });

        }catch(error){
            res.status(400).json({error: error.message})
        }
      }

      const updateProduct = async(req, res) => {
        const productId = req.params.id;

        const updateData = req.body;

        try{
            const updatedProduct = await productServices.updateProduct(productId, updateData);

            if(!updatedProduct) {
                return res.status(404).json({error: 'Product not found'})
            }

            res.status(200).json({message: 'Product updated successfully', product:updatedProduct})
           
        }catch(error){
            res.status(400).json({ error: error.message });
        }
      }

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct
}
