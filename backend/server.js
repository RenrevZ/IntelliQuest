const express = require('express')
const server = express()
const UserController = require('./controller/UsersController')

server.listen(5000)

server.get('/',UserController.store)
