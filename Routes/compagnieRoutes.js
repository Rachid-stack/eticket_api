//importing modules
const express = require('express')
const compagnieController = require('../Controllers/compagnieController')
const {findAll} = compagnieController
const router = express.Router()
//signup endpoint
//passing the middleware function to the signup
router.get('/findAll', findAll)
module.exports = router