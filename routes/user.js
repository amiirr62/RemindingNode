const express = require ('express')
let users = require('../users')
const { body, validationResult } = require('express-validator')
const router = express.Router()

//******************* View All Users  *****************/
router.get('/',function(req,res){
    
    res.status(200).json({
     data : users , 
     success : true
    })
 
 
 })
 
 //******************* View ONE User  *****************/
 router.get('/:id', (req,res)=>{
     let user = users.find(user => {
         if(user.id == req.params.id){
             return user
         }
     }) 
     res.status(200).json({
         data : user , 
         success : true
        })
 })
 
 //******************* POST A User  *****************/
 router.post('/',
 
 body('email', 'Invalid Email!!!').isEmail(),
 body('password','Minimum Length is 5 characters!').isLength({ min: 5 }),
 
 (req,res)=>{
     
     const errors = validationResult(req)
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() })
     }
 
     req.body.id = parseInt(req.body.id)
     users.push(req.body)
     res.json({data:'User has been successfully Created.!'})
 })
 
 //******************* UPDATE A User  *****************/
 router.put('/:id',
 
 body('email', 'Invalid Email!!!').isEmail(),
 body('password','Minimum Length is 5 characters!').isLength({ min: 5 }),
 
 (req,res)=>{
 
     const errors = validationResult(req)
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() })
     }
 
     users = users.map(user => {
         if(user.id == req.params.id){
             return req.body
         }else{
             return user
         }
     })
 
     res.json({data:'User has been successfully updated.!'})
 })
 
 //******************* DELETE A User  *****************/
 router.delete('/:id',(req,res)=>{
     users = users.filter(user => {
         if (user.id != req.params.id){
             return user
         }
     })
     res.json({data:'User has been successfully Deleted!!!!'})
 })
 


 module.exports = router