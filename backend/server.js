const express = require('express')
const server = express()
const cors = require('cors');
require('dotenv').config()
const ConnectDatabase = require('./model/BaseModel')
let path = require('path');

ConnectDatabase()


//MIDDLEWARE
server.use(cors()); 
server.use(express.json());
server.use(express.urlencoded({extended:true}))
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const ip = '192.168.100.23'


// ROUTER IMPORT
// const userRoute = require('./routes/userRouter')
const booksRoute = require('./routes/booksRouter')
const ReviewsRoute = require('./routes/reviewsRoutes')

// API ROUTES
server.use('/books',booksRoute)
server.use('/reviews',ReviewsRoute)
// server.use('/users',userRoute)


server.listen(process.env.SERVER_PORT)
