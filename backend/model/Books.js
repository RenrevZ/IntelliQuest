const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    "Book Cover":{
        data: Buffer,
        contentType: String
    },
    "Book Title": {
        type:String,
        required:true,
        maxlength: 50
    },
    "Book Description": {
        type:String,
        required:true,
        maxlength: 100
    },
    "Author" : {
        type:String,
        required:true,
        maxlength: 50
    },
    "Ratings":Number,
    "Category" : String,
    "Publish Date": String,
    "added By":String,
    "Comments" : Object,
})

// class Books extends BaseModel {
//     constructor(){
//         super()
//     }

//     async collection(){
//         const db = await this.db
//         const collection = db.collection('books')

//         return collection
//     }

//     async insertOne(data){
//         const bookCollection = await this.collection();
//         await bookCollection.insertOne(data)
//     }

//     async getAllBooks(){
//         const bookCollection = await this.collection();
//         const books = await bookCollection.find().toArray();
        
//         return books;
//     }
// }

module.exports = mongoose.model('Books',BookSchema)