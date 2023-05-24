
const express = require ('express')
const config = require('./config')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session') 
const mongoose = require('mongoose')

const app = express()
require('dotenv').config()

mongoose.connect('mongodb://127.0.0.1:27017/RemindingNode').then(() => console.log('MongoDB Has Been Connected!'))

global.config = require('./config')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended : false}))
app.use(methodOverride('method'))
app.set('view engine','ejs')

app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    
  }))

app.use(flash())

app.use((req,res,next)=>{
  res.locals = {errors : req.flash('errors')}
  next()
})
    
   /*  cookie : {expires : new Date(Date.now() + (1000 * 3600 * 24 * 100)) ,
              store   : MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/NodeDB' })
             } */
/* }))  */ 

app.use(flash())  


app.use('/', require('./routes/0-index'))


app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`)
})




