//importing modules
const express = require('express')
const gareController = require('../Controllers/gareController')
const {findAll,findAllByCityAndCompany} = gareController
const router = express.Router()
//signup endpoint
//passing the middleware function to the signup
router.get('/findAll', findAll)
//login route
router.get('/:compId/:villeId', findAllByCityAndCompany )
module.exports = router