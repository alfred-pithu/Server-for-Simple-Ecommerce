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
    console.log(newUser)
    try {
        const result = await User.create(newUser)
        res.status(201).json(result)
    } catch (err) {
        console.error(err)
    }

    // res.sendStatus(200)
}

module.exports = { getAllUser, addNewUser }