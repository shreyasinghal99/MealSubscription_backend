const express = require('express')
const bookingRouter = express.Router();

const {createSession} = require('../Controller/bookingController')
const {protectRoute} = require('../Controller/authController')

bookingRouter.
post("/createSession",protectRoute,createSession)

bookingRouter.get("/createSession",(req,res)=>{
    res.sendFile('C:/Users/modern/Documents/PepDev/BackEnd/foodApp/booking.html')

})

module.exports = bookingRouter
