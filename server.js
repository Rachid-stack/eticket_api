//importing modules
const express = require('express')
const cors = require('cors')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('./Models')
const userRoutes = require ('./Routes/utilisateurRoutes')
const villeRoutes=require('./Routes/villeRoutes')
const compagnieRoutes=require('./Routes/compagnieRoutes')
const gareRoutes=require('./Routes/gareRoutes')
const trajetRoutes=require('./Routes/trajetRoutes')
const departRoutes=require('./Routes/departRoutes')
const reservationRoutes=require('./Routes/reservationRoutes')
//setting up your port

const PORT = process.env.PORT || 8080

//assigning the variable app to express
const app = express()
//middleware
app.use(express.json(),cors());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync")
})
//routes for the user API
app.use('/api/users', userRoutes)
app.use('/api/villes',villeRoutes)
app.use('/api/compagnie',compagnieRoutes)
app.use('/api/gare',gareRoutes)
app.use('/api/trajet',trajetRoutes)
app.use('/api/depart',departRoutes)
app.use('/api/reservation',reservationRoutes)
//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
