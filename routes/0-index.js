const express = require ('express')
const router = express.Router()



router.use('/users', require('./users'))


router.use('/',(req,res)=>{
    res.render('index.ejs')
})

module.exports = router