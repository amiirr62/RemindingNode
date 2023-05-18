
const express = require ('express')
const config = require('./config')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session') 

const app = express()
global.config = require('./config')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended : false}))
app.use(methodOverride('method'))
app.set('view engine','ejs')

app.use(cookieParser('vgh32shk0nc59gjhfdmkgskct'))


app.use(session({
    secret: 'shaghvsmnabkjgsagskjabagsga7896sagfsa5',
    resave: true,
    saveUninitialized: true,
    


  }))
app.use(flash())
    
   /*  cookie : {expires : new Date(Date.now() + (1000 * 3600 * 24 * 100)) ,
              store   : MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/NodeDB' })
             } */
/* }))  */ 

app.use(flash())  


app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.use('/users', require('./routes/users'))


app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`)
})




