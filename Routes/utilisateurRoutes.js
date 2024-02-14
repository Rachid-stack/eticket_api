//importing modules
const express = require('express')
const userController = require('../Controllers/utilisateurController')
const { signup, login,findOne } = userController
const userAuth = require('../Middlewares/utilisateurAuth')

const router = express.Router()
//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)
//login route
router.post('/login', login )
router.get('/findOne/:id',findOne)
module.exports = router