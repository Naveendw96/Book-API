const mongoose = require('mongoose'); 

//Create book schema

const BookSchema = mongoose.Schema(
    {
        ISBN: String,
        title: String,
        authors: [Number],
        language: String,
        pubdate: String,
        numOfPage: Number,
        category: [String],
        publication: [Number]    
    }
);

const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;