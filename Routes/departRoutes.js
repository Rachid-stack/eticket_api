//importing modules
const express = require('express')
const departController = require('../Controllers/departController')
const {findAll,findOne} = departController
const router = express.Router()
//signup endpoint
//passing the middleware function to the signup
router.get('/findAll', findAll)
router.get('/findOne/:id_',findOne)
module.exports = router