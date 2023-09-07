const mongoose = require('mongoose')

const ReviewsSchema = new mongoose.Schema({
    "BookId":{
        type:String,
        required:true
    },
    "Rating": {
        type:Number,
        required:true,
        min:1,
        max:5
    },
    "Description":{
        type:String,
        required:true,
        maxlength: 200
    },
    "userID":String
})

module.exports = mongoose.model('Reviews',ReviewsSchema)