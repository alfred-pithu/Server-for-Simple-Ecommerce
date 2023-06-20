const express = require('express');
const router = express.Router();
const userController = require('../../controllers/usersController')

router.route('/')
    .get(userController.getAllUser)
    .post(userController.addNewUser)



module.exports = router;