const express = require ('express')
const { debug } = require('../config')
const { config } = require('dotenv')
const router = express.Router()


router.use('/users', require('./users'))


//router.use('/',(req,res)=>{ res.render('index.ejs')})


router.all('*', async(req,res,next)=>{
    try {
        let err= new Error(`"${req.url}" Does NOT Exist!!`)
        err.status = 404

        throw err

    } catch (err) {
        next(err)
    }
}  )

router.use(async(err,req,res,next)=>{
    const code = err.status || 500
    const message = err.message || ""
    const stack = err.stack || ""

    if(config.debug ){
        return res.render('errors/user' , {message , stack})
    }else{
        return res.render('errors/developer', {code ,  message , stack})
    }

})

module.exports = router 