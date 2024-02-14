//importing modules
const express = require('express')
const reservationController = require('../Controllers/reservationController')
const {findAll,createReservation,findReservationSiege,findOne} = reservationController
const router = express.Router()
//signup endpoint
//passing the middleware function to the signup
router.get('/findAll', findAll)
router.get('/findOneRes/:id_res',findOne)
router.post('/create', createReservation)
router.get('/findOne/:id_dep/:date_dep',findReservationSiege)
module.exports = router