const express = require ('express')
let controller = require('./controller')
const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const passport = require('passport')


class authController extends controller{
    async loginForm(req,res,next){
        try{
            
           
            res.render('auth/loginView')
        }catch(err){
            next(err)
        }
        
    
    }

    async registerForm(req,res,next){
        try{
            res.render('auth/registerView' )
        }  
        catch(err){
            next(err)
        }
        
    
    }

    async login(req,res,next){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let myErrors = errors.array().map(err => err.msg)
                req.flash('errors', myErrors)
               return res.redirect('/auth/login' )
            }

            passport.authenticate('local.login', (err,user)=>{
                if(!user) return res.redirect('/auth/login')

                req.logIn(user, err=>{
                  return res.redirect('/dashboard')
                })
              })(req,res,next)
              
      
        }catch(err){
            next(err)
        }
        
    
    }


    async register(req,res,next){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let myErrors = errors.array().map(err => err.msg)
                req.flash('errors', myErrors)
               return res.redirect('/auth/register' )
            }
            
            passport.authenticate('local.register',{
                successRedirect : '/dashboard',
                failureRedirect : '/auth/register',
                failureFlash : true
  
              })(req,res,next)
      
        }catch(err){
            next(err)
        }
        
    
    }

    

    
}

module.exports = new authController