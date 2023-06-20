const express = require('express');
const router = express.Router();
const userController = require('../../controllers/usersController')

router.route('/')
    .get(userController.getAllUser)
    .post(userController.addNewUser)

router.route('/:email')
    .patch(userController.updateCart)



module.exports = router;