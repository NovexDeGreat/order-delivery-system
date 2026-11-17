const cartService = require("../service/clearcart.services");


// CLEAR ENTIRE CART
const clearCart = async (req, res) => {
    try {
        const cart = await cartService.clearCart(req.user.id);

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            cart
        });

    } catch (error) {
        const status = error.message === "Cart not found" ? 404 : 500;

        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    clearCart
};