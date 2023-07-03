const express = require ('express')
let controller = require('./controller')
const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const passport = require('passport')
const Recaptcha = require('express-recaptcha').RecaptchaV2

const options = { hl: 'en' }
const recaptcha = new Recaptcha('6LfvPfEmAAAAAJUifh2Lol0bcIqIp3EwkGNlHLj3', 
                                '6LfvPfEmAAAAAOknUq9ntcK8dp0miPbU2TRlwb7W', options)


class authController extends controller{
    async loginForm(req,res,next){
        try{
            
           
            res.render('auth/loginView',  {recaptcha : recaptcha.render()})
        }catch(err){
            next(err)
        }
        
    
    }

    async registerForm(req,res,next){
        try{
            res.render('auth/registerView' , {recaptcha : recaptcha.render()})
        }  
        catch(err){
            next(err)
        }
        
    
    }

    async login(req,res,next){
        try{
            //Recatcha Evaluation...
            let recaptchaResult =  await new Promise((resolve,reject)=>{
                recaptcha.verify(req,(err,data)=>{
                    if(err){
                        req.flash('errors','Checkmark Recaptcha !!!')
                        return res.redirect('/auth/login')
                        resolve(false)
                    }else{
                        resolve(true)
                    }

                })

            })

            if(!recaptchaResult){
                return 
            }

            //Error Evaluation...
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

            let recaptchaResult =  await new Promise((resolve,reject)=>{
                recaptcha.verify(req,(err,data)=>{
                    if(err){
                        req.flash('errors','Checkmark Recaptcha !!!')
                        return res.redirect('/auth/register')
                        resolve(false)
                    }else{
                        resolve(true)
                    }

                })

            })

            if(!recaptchaResult){
                return 
            }




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