const express = require('express')
const server = express()
const cors = require('cors');
require('dotenv').config()
const ConnectDatabase = require('./model/BaseModel')

ConnectDatabase()


//MIDDLEWARE
server.use(cors()); 
server.use(express.json());
server.use(express.urlencoded({extended:true}))


// ROUTER IMPORT
// const userRoute = require('./routes/userRouter')
const booksRoute = require('./routes/booksRouter')

// API ROUTES
server.use('/books',booksRoute)
// server.use('/users',userRoute)


server.listen(process.env.SERVER_PORT)
