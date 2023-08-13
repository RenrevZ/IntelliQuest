const BaseModel = require('./BaseModel')
const model = 'users'

class User extends BaseModel {
    constructor(){
        super()
    }

    async insertOne(data){
        const db = await this.db
        const collection = db.collection('users')

        const result = await collection.insertOne(data)
    }
}

module.exports = User