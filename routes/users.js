const express = require ('express')
let User = require('../models/user')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const userController = require('../controllers/userController')
const userValidator = require('../validators/userValidator')


router.get('/', userController.getAllUsers.bind(userController) )
 
router.get('/:id', userController.viewOneUser.bind(userController))

router.post('/', userValidator.handle(), userController.createUser.bind(userController) )
 
router.put('/:id', userValidator.handle(), userController.updateUser.bind(userController) )

router.delete('/:id',userController.deleteUser.bind(userController)) 
 

 module.exports = router
