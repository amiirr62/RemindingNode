const express = require ('express')
let users = require('../users')
const { body, validationResult } = require('express-validator')
const router = express.Router()

//******************* View All Users  *****************/
router.get('/',function(req,res){
    
    res.render('users' , {users})
 
 })
 
 //******************* View ONE User  *****************/
 router.get('/:id', (req,res)=>{
     let user = users.find(user => {
         if(user.id == req.params.id){
             return user
         }
     }) 
     res.render('user',{user})
    })
 //******************* POST A User  *****************/
 router.post('/',
 
 body('email', 'Invalid Email!!!').isEmail(),
 body('password','Minimum Length is 3 characters!').isLength({ min: 3 }),
 
 (req,res)=>{
     
     const errors = validationResult(req)
     if (!errors.isEmpty()) {
       return res.redirect('/users')
     }
 
     req.body.id = parseInt(req.body.id)
     users.push(req.body)
     res.redirect('/users')
 })
 
 //******************* UPDATE A User  *****************/
 router.put('/:id',
 
 body('email', 'Invalid Email!!!').isEmail(),
 body('password','Minimum Length is 5 characters!').isLength({ min: 5 }),
 
 (req,res)=>{
 
     const errors = validationResult(req)
     if (!errors.isEmpty()) {
       return res.redirect('/users')
     }
 
     users = users.map(user => {
         if(user.id == req.params.id){
             return req.body
         }else{
             return user
         }
         
        })

        res.redirect('/users')
       
     
 })
 


    
 //******************* DELETE A User  *****************/
  router.delete('/:id',(req,res)=>{
     users = users.filter(user => {
         if (user.id != req.params.id){
             return user
         }
     })  
     return res.redirect('/users')
 }) 
 

 module.exports = router
