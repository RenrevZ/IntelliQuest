require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser:true })

const ConnectDatabase = async () => {
    const db = mongoose.connection
    db.on('error',(error) => console.log(error))
    db.once('open',() => console.log('Database Connected'))
}

module.exports = ConnectDatabase


