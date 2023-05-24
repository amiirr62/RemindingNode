const express = require ('express')
let controller = require('./controller')
const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const router = express.Router()


class authController extends controller{
    async loginForm(req,res,next){
        try{
            
           
            res.render('auth/loginView',{errors: req.flash('errors')})
        }catch(err){
            next(err)
        }
        
    
    }

    async registerForm(req,res,next){
        try{
            const errors = validationResult(req)
        if (!errors.isEmpty()) {
           req.flash('errors', errors.array())
           return res.redirect('/auth/register')
        }
            res.render('auth/registerView' , {errors: req.flash('errors') })
      
        }catch(err){
            next(err)
        }
        
    
    }

    async login(req,res,next){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
               req.flash('errors', errors.array())
               return res.redirect('/auth/login' )
            }
            console.log('login')
      
        }catch(err){
            next(err)
        }
        
    
    }


    async register(req,res,next){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
               req.flash('errors', errors.array())
               return res.redirect('/auth/register' )
            }
            console.log('register')
      
        }catch(err){
            next(err)
        }
        
    
    }

    

    
}

module.exports = new authController