const User = require('../model/User')
const mongoose = require('mongoose');


const getAllOrders = async (req, res) => {

}


const placeOrder = async (req, res) => {
    const { itemId, email } = req.params;
    console.log("Item id and email", itemId, email)
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

        res.sendStatus(200)

    } catch (err) {
        console.error(error)
    }
}

module.exports = { placeOrder }