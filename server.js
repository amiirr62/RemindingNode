
const express = require ('express')
const config = require('./config')
const { body, validationResult } = require('express-validator')

const app = express()

let users = require('./users')

global.config = require('./config')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended : false}))

//******************* View All Users  *****************/
app.get('/',function(req,res){
    
   res.status(200).json({
    data : users , 
    success : true
   })


})

//******************* View ONE User  *****************/
app.get('/:id', (req,res)=>{
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
app.post('/',

body('email', 'Invalid Email!!!').isEmail(),
body('password','Minimum Length is 5 characters!').isLength({ min: 5 }),

(req,res)=>{
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    req.body.id = parseInt(req.body.id)
    users.push(req.body)
    res.json({data:'User has been successfully updated.!'})
})

//******************* UPDATE A User  *****************/
app.put('/:id',

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
app.delete('/:id',(req,res)=>{
    users = users.filter(user => {
        if (user.id != req.params.id){
            return user
        }
    })
    res.json({data:'User has been successfully Deleted!!!!'})
})






app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`)
})




