const express = require('express');
const router = express.Router();
const userController = require('../../controllers/usersController')

router.route('/')
    .get(userController.getAllUser)
    .post(userController.addNewUser)

router.route('/:email')
    .get(userController.getOneUser)
    .patch(userController.updateCart)



module.exports = router;