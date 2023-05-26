const express = require ('express')
let User = require('../models/user')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const dashController = require('../controllers/dashController')


router.get('/', dashController.index)

 

 

 module.exports = router
