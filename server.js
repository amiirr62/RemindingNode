
const express = require ('express')
const config = require('./config')
const app = express()


global.config = require('./config')
app.use(express.static(__dirname + '/public'))

//**************** query ******************** */
app.get('/',function(req,res){
    
    res.send(`hello amir , ${req.query.name}`)
})

//**************** Params ******************** */
app.get('/:username',function(req,res){
    console.log(req.params)
    res.send(`hello, ${req.params.username}`)
})



app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`)
})




