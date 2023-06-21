const User = require('../model/User')
const mongoose = require('mongoose');

// To get all the users and their infos
const getAllUser = async (req, res) => {
    const allUsers = await User.find();
    if (!allUsers) {
        return res.status(204).json({ "message": "No User Found" })
    }
    return res.send(allUsers)
}

// To add a new user in the database when someone new registers on the website
const addNewUser = async (req, res) => {
    const newUser = req.body;
    try {
        const result = await User.create(newUser)
        res.status(201).json(result)
    } catch (err) {
        console.error(err)
    }

}

// To add a product in the cart of one certain user
const updateCart = async (req, res) => {
    const userEmail = req.params.email;
    const newItemForCartArray = req.body.item;
    try {
        await User.findOneAndUpdate(
            { email: userEmail },
            { $push: { cart: newItemForCartArray } },
            { new: true }
        )
            .then(updatedUser => {
                console.log('Successfull', updatedUser)
                res.json(updatedUser)
            })
            .catch((err) => {
                res.status(500).json({ "message": "An Error occured" })
            })
    } catch (err) {
        console.error(err)
    }
}

// To get one particular user using their email
const getOneUser = async (req, res) => {
    const userEmail = req.params.email;
    if (!userEmail) return res.json({ "message": "User email required" })
    try {
        const result = await User.findOne({ "email": userEmail })
        res.json(result)
    } catch (err) {
        console.error(err)
    }
}

// To delete one product from the user's cart

const deleteFromCart = async (req, res) => {
    const { itemId, email } = req.params;
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

        return res.json(updatedUser);


    } catch (err) {
        console.error(error)
    }
}

module.exports = { getAllUser, addNewUser, updateCart, getOneUser, deleteFromCart }