const BaseModel = require('./BaseModel')
const model = 'users'

class User extends BaseModel {
    constructor(){
        super()
    }

    async collection(){
        const db = await this.db
        const collection = db.collection(model)

        return collection
    }

    async insertOne(data){
        const userCollection = await this.collection();
        await userCollection.insertOne(data)
    }

    async getAllUser(){
        const userCollection = await this.collection();
        const users = await userCollection.find().toArray();
        
        return users;
    }
}

module.exports = User