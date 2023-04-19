
const express = require ('express')
const config = require('./config')
const app = express()

let users = require('./users')

global.config = require('./config')
app.use(express.static(__dirname + '/public'))

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





app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`)
})




