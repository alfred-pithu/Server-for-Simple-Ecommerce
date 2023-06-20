const User = require('../model/User')

const getAllUser = async (req, res) => {
    const allUsers = await User.find();
    if (!allUsers) {
        return res.status(204).json({ "message": "No User Found" })
    }
    return res.json(allUsers)
}

const addNewUser = async (req, res) => {
    const newUser = req.body;
    try {
        const result = await User.create(newUser)
        res.status(201).json(result)
    } catch (err) {
        console.error(err)
    }

}

const updateCart = async (req, res) => {
    const userEmail = req.params.email;
    console.log('email', userEmail)
    const newItemForCartArray = req.body.item;
    console.log('Sent Item for add', newItemForCartArray)
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

module.exports = { getAllUser, addNewUser, updateCart }