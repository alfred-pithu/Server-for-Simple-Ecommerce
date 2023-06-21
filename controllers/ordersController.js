const User = require('../model/User')
const Order = require('../model/Order')
const mongoose = require('mongoose');


// Getting all the order for the Admin Dashboard
const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find();
        res.status(201).json(allOrders)
    } catch (err) {
        console.error(err)
    }
}

// Placing an order
const placeOrder = async (req, res) => {
    const { itemId, email } = req.params;
    const product = req.body;
    console.log('Product from req.body      ', product)
    if (!itemId || !email) {
        res.json({ "message": "Item Id and User email required" })
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email: email });

        const cartItems = user.cart.map(item => JSON.parse(item));

        // Find the index of the item to remove based on its _id
        const itemIndex = cartItems.findIndex(item => item._id === itemId);


        // Remove the item from the cart array
        cartItems.splice(itemIndex, 1)

        // Update the user's cart with the modified array of stringified JSON objects
        user.cart = cartItems.map(item => JSON.stringify(item));


        // Save the updated user document
        const updatedUser = await user.save();

        try {
            // Place the order 
            const newOrder = {
                userEmail: email,
                productId: product._id,
                productName: product.name,
                price: product.price,
                productImage: product.image
            }

            const createdOrder = await Order.create(newOrder)

            res.status(201).json({ createdOrder })

        } catch (err) {
            console.error(err)
        }

    } catch (err) {
        console.error(error)
    }
}

module.exports = { placeOrder, getAllOrders }