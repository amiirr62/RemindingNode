
const express = require ('express')
const config = require('./config')
const methodOverride = require('method-override')

const app = express()
global.config = require('./config')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended : false}))
app.use(methodOverride('method'))

app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.use('/users', require('./routes/users'))
app.set('view engine','ejs')

app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`)
})




