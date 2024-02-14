//importing modules
const express = require('express')
const villeController = require('../Controllers/villeController')
const {findAll} = villeController
const router = express.Router()
//signup endpoint
//passing the middleware function to the signup
router.get('/findAll', findAll)
module.exports = router