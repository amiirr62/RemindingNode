const express = require ('express')
let User = require('../models/user')
const { body, validationResult } = require('express-validator')
const router = express.Router()



//******************* View All Users  *****************/
router.get('/', async function(req,res){
    
    let users = await User.find({})

    res.render('users',{users:users, title:'All Users', errors:req.flash('errors') , message:req.flash('message')})

})
 
 //******************* View ONE User  *****************/
 router.get('/:id', async(req,res)=>{
     let user = await User.findOne({
        _id : req.params.id
     })    
     res.render('user',{user})
    })
 //******************* POST A User  *****************/
 router.post('/',
 
 body('email', 'Invalid Email!!!').isEmail(),
 body('password','Minimum Length is 3 characters!').isLength({ min: 3 }),
 
 async(req,res)=>{
     
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
 })
 
 //******************* UPDATE A User  *****************/
 router.put('/:id',
 
 body('email', 'Invalid Email!!!').isEmail(),
 body('password','Minimum Length is 5 characters!').isLength({ min: 5 }),
 
 async(req,res)=>{
    

     const errors = validationResult(req)
     if (!errors.isEmpty()) {
        req.flash('errors', errors.array())
       return res.redirect('/users')
     }
 
     await User.updateOne({_id : req.params.id} , {$set : req.body})
        req.flash('message', 'User Successfully Updated!!')
        res.redirect('/users')
       
     
 })
 
    
 //******************* DELETE A User  *****************/
  router.delete('/:id',async(req,res)=>{
     
    await User.deleteOne({_id : req.params.id})

     req.flash('message', 'User Successfully Deleted!!') 
     return res.redirect('/users')
 }) 
 

 module.exports = router
