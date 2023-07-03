const express = require ('express')
let User = require('../models/user')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const dashController = require('../controllers/dashController')
const uploadUserProfile = require('../upload/uploadUserProfile')

const editUserValidator   = require('../validators/editUserValidator')



router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/auth/login')
})

router.get('/', dashController.index)

router.post('/edituser', uploadUserProfile.single('img') , (req,res,next)=>{
    if (!req.file){
        req.body.img = null
    }else{
        req.body.img = req.file.filename
    }
    next()
} , editUserValidator.handle() ,dashController.edituser)

 

 

 module.exports = router
