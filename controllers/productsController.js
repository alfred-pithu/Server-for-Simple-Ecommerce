const Product = require('../model/Product')

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    if (!products) {
        return res.status(204).json({ "message": "No products found" })
    }
    res.json(products);
}




module.exports = {
    getAllProducts
}