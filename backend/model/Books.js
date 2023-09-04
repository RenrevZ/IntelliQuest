const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    "BookCover":String,
    "BookTitle": {
        type:String,
        required:true,
        maxlength: 50
    },
    "BookSubtitle":{
        type:String,
        required:true,
        maxlength: 100
    },
    "BookDescription": {
        type:String,
        required:true,
        maxlength: 500
    },
    "BookGenre":{
        type:Array
    },
    "Author" : {
        type:String,
        required:true,
        maxlength: 50
    },
    "Ratings":Number,
    "Category" : String,
    "PublishDate": String,
    "addedBy":String,
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