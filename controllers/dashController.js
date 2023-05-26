const express = require ('express')
let controller = require('./controller')
const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const router = express.Router()


class dashController extends controller{
    async index(req,res,next){
        try{
            
           
            res.render('dashboard/index')
        }catch(err){
            next(err)
        }
        
    
    }

    
}

module.exports = new dashController