const express = require ('express')
let controller = require('./controller')
const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const router = express.Router()


class userController extends controller{
    async getAllUsers(req,res,next){
        try{
            let users = await User.find({})
    
            res.render('users',{users:users, title:'All Users', errors:req.flash('errors') , message:req.flash('message')})

        }catch(err){
            next(err)
        }
        
    
    }

    async viewOneUser(req,res,next){
        try {
            let user = await User.findOne({
                _id : req.params.id
             })    
             res.render('user',{user})

        } catch (err) {
            next(err)
        }
        
       }

    async createUser(req,res,next){

        try {
            const errors = validationResult(req)
        if (!errors.isEmpty()) {
           req.flash('errors', errors.array())
           return res.redirect('/users')
        }
    
        req.body.id = parseInt(req.body.id)
   
        let newUser = new User ({
           first_name : req.body.first_name,
           email : req.body.email,
           password : req.body.password,
        })
        await newUser.save()
           
        req.flash('message', 'User Successfully Created!!') 
        res.redirect('/users')

        } catch (err) {
           next(err) 
        }
     
        
    }

    async updateUser(req,res,next){
    
        try {
            const errors = validationResult(req)
        if (!errors.isEmpty()) {
           req.flash('errors', errors.array())
          return res.redirect('/users')
        }
    
        await User.updateOne({_id : req.params.id} , {$set : req.body})
           req.flash('message', 'User Successfully Updated!!')
           res.redirect('/users')

        } catch (err) {
            next(err)
        }

    }

    async deleteUser(req,res,next){
        try {
            await User.deleteOne({_id : req.params.id})
    
            req.flash('message', 'User Successfully Deleted!!') 
           return res.redirect('/users') 
           
        } catch (err) {
            next(err)
        }
     
        
     }
}

module.exports = new userController