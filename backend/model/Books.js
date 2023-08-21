const BaseModel = require('./BaseModel')

class Books extends BaseModel {
    constructor(){
        super()
    }

    async collection(){
        const db = await this.db
        const collection = db.collection('books')

        return collection
    }

    async insertOne(data){
        const bookCollection = await this.collection();
        await bookCollection.insertOne(data)
    }

    async getAllBooks(){
        const bookCollection = await this.collection();
        const books = await bookCollection.find().toArray();
        
        return books;
    }
}

module.exports = Books