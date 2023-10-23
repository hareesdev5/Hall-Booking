const express = require('express')
const router = express.Router()

const roomController = require('../controller/room')


router.get('/getRoom',roomController.getRoom)
router.post('/createRoom',roomController.createRoom)
router.get('/viewbooking',roomController.viewBooking)
router.post('/createbooking/:id',roomController.createBooking)
router.get('/customers',roomController.getCustomer)
router.get('/customer/:name',roomController.getCustomerByName)


module.exports =  router
