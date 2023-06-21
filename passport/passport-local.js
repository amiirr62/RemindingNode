const express = require('express')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
User = require('../models/user')

//Coding User's id and store in browser
passport.serializeUser((user,done)=>{
    done(null, user.id)

})

//Decoding Cookie and deliver user's id
passport.deserializeUser(async (id,done)=>{
    let user = await User.findById(id)
    if(user) done(null,user)
})
//********************************* Register Strategy ***************************************** */
passport.use("local.register", new localStrategy(
    {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true,
    }, async(req, email, password, done)=>{
        try {
            let user = await User.findOne({email : req.body.email})
            if (user){
                return done(null, false, req.flash('errors','User already existed.!!'))
            }
            const newUser = new User({
                first_name : req.body.name,
                email: req.body.email,
                password: req.body.password,
            })

            await newUser.save()
            done(null, newUser)
        } 
        catch (error) {
            return done(error, false, {message:error})
        }

    }
))
//********************************* Login Strategy ***************************************** */
passport.use("local.login", new localStrategy(
{
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
}, async(req, email, password, done)=>{
   try {
    let user = await User.findOne({email : req.body.email})

    if(!user || user.password != req.body.password){
        return done(null, false, req.flash('errors','No users have found!!!  '))
    }

    done(null,user)

   } catch (error) {
    return done(error, false, {message :  error})
   }
    
        }))