const express = require('express')
const server = express()

//MIDDLEWARE
server.use(express.json());
server.use(express.urlencoded({extended:true}))

// ROUTER IMPORT
const userRoute = require('./routes/userRouter')

// API ROUTES
server.use('/users',userRoute)

server.listen(5000)
