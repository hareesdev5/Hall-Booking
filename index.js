const express = require('express')
const appRouter = require('./routes')

const app = express()

app.use(express.json())
app.use('/',appRouter)

app.listen(8000,()=>console.log('Server listening port 8000'))