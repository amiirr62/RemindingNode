const express = require ('express')
let User = require('../models/user')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const authController = require('../controllers/authController')
const authValidator = require('../validators/authValidator')

router.use((req,res,next)=>{
    if(req.isAuthenticated()){   //if user logged In the result is True, otherwise False
        return res.redirect('/dashboard')
    }
    next()
})

router.get('/login', authController.loginForm)
router.get('/register', authController.registerForm )

router.post('/login',authValidator.login(), authController.login)
router.post('/register',authValidator.register(),authController.register)
 

 

 module.exports = router
