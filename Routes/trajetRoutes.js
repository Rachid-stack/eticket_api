//importing modules
const express = require('express')
const trajetController = require('../Controllers/trajetController')
const {findAll,getTrajetsByDepartArrive} = trajetController
const router = express.Router()
//signup endpoint
//passing the middleware function to the signup
router.get('/findAll', findAll)
//login route
router.post('/search',getTrajetsByDepartArrive)
module.exports = router