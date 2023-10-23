const express = require('express')
const router = express.Router()

const roomRouter = require('./room')

router.use('/room',roomRouter)


module.exports = router