// ---------------------------------Main Backend File-------------------------------------

const db = require("./database/index.js");
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");

const express = require("express");
const app = express();
app.use(express.json()); // express.json() - Built in middleware function in express. It passes incoming request with json payloads and its based on body parcel

//---Method 1-----
var mongoose = require('mongoose');       // Import the mongoose module
// Set uop default mongoose connection
var mongoDB = "mongodb+srv://NaveenDW:dj6FgFSvmkFa8PC@cluster0.wjsc8.mongodb.net/book-company?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("***Connection Established***"));


//---Method 2-----
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://NaveenDW:dj6FgFSvmkFa8PC@cluster0.wjsc8.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const bcollection = client.db("book-company").collection("books").findOne({ISBN: "12345three"});
//   bcollection.then((data) => console.log(data)).catch((err) => console.log(err));
//   // perform actions on the collection object
// //   client.close();
// });

// ---------------------------------GET APIs-------------------------------------

//http://localhost:3000/
app.get("/",(req,res) => {
    return res.json("Welcome to my backend software for the book company");
})
/*
Route           /authors
Description     Get all authors
Access          PUBLIC
Parameter       None
Methods         Get
*/
//http://localhost:3000/books
app.get("/books", async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
})

//http://localhost:3000/book-isbn/12345two
app.get("/book-isbn/:isbn", async (req, res) => {
    const {isbn} = req.params;
    const getSpecificBook = await BookModel.findOne({ISBN: isbn});
    if (getSpecificBook === null){
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook);
    
})

//http://localhost:3000/book-category/programming
app.get("/book-category/:category", async (req, res) => {
    const cat = req.params.category;
    const getSpecificBookByCategory = await BookModel.find({category:cat});
    if (getSpecificBookByCategory.length === 0){
        return res.json({"error": `No Books found for the category of ${cat}`});
    }
    return res.json(getSpecificBookByCategory);
})
//http://localhost:3000/authors
app.get("/authors", async (req,res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
})

//http://localhost:3000/author-id/1
app.get("/author-id/:id", async (req, res) => {
    let {id} = req.params;
    id = Number(id);
    const getSpecificAuthorByID = await AuthorModel.findOne({id: id});
    if (getSpecificAuthorByID === null){
        return res.json({"error": `No Book found for the ID of ${id}`});
    }
    return res.json(getSpecificAuthorByID);
    
})

//http://localhost:3000/author-isbn/12345two
app.get("/author-isbn/:isbn", async (req, res) => {
    const {isbn} = req.params;
    const getSpecificAuthorsByISBN = await AuthorModel.find({books: isbn}) ;
    if (getSpecificAuthorsByISBN.length === 0){
        return res.json({"error": `No Author found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificAuthorsByISBN); 
})

//http://localhost:3000/publications
app.get("/publications", async (req,res) => {
    const getAllPublications = await PublicationModel.find() ;
    return res.json(getAllPublications);
})

//http://localhost:3000/publication-id/1
app.get("/publication-id/:id", async (req, res) => {
    let {id} = req.params;
    id = Number(id);
    const getSpecificPublicationByID = await PublicationModel.findOne({id: id});
    if (getSpecificPublicationByID === null){
        return res.json({"error": `No Publication found for the ID of ${id}`});
    }
    return res.json(getSpecificPublicationByID);
    
})

//http://localhost:3000/publication-isbn/12345two
app.get("/publication-isbn/:isbn", async (req, res) => {
    const {isbn} = req.params;
    const getSpecificPublicationByISBN = await PublicationModel.find({books: isbn});
    if (getSpecificPublicationByISBN.length === 0){
        return res.json({"error": `No Publication found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificPublicationByISBN); 
})

// ---------------------------------POST APIs-------------------------------------

//http://localhost:3000/book
app.post("/book", async (req,res) => {
    const addNewBook = await BookModel.create(req.body);
    return res.json({
        books: addNewBook,
        message: "Book was added!!!"
    });
});

//http://localhost:3000/author
app.post("/author", async (req,res) => {
    const addNewAuthor = await AuthorModel.create(req.body);
    return res.json({
        authors: addNewAuthor,
        message: "Author was added!!!"
    });
});

//http://localhost:3000/publication
app.post("/publication", async (req,res) => {
    const addNewPublication = await PublicationModel.create(req.body);
    return res.json({
        publications: addNewPublication,
        message: "Publication was added!!!"
    });
});

// ---------------------------------PUT APIs-------------------------------------

//http://localhost:3000/book-update/12345one
app.put("/book-update/:isbn", async (req,res) => {
    const {isbn} = req.params;
    const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, req.body, {new:true});
    return res.json({
        bookUpdated: updateBook,
        message: "Book was updated!!!"
    });
});

//http://localhost:3000/author-update/1
app.put("/author-update/:id", async (req,res) => {
    let {id} = req.params;
    id = Number(id);
    const updateAuthor = await AuthorModel.findOneAndUpdate({id: id}, req.body, {new:true});
    return res.json({
        authorUpdated: updateAuthor,
        message: "Author was updated!!!"
    });
});

//http://localhost:3000/publication-update/1
app.put("/publication-update/:id", async (req,res) => {
    let {id} = req.params;
    id = Number(id);
    const updatePublication = await PublicationModel.findOneAndUpdate({id: id}, req.body, {new:true});
    return res.json({
        publicationUpdated: updatePublication,
        message: "Publication was updated!!!"
    });
});

// ---------------------------------DELETE APIs-------------------------------------

// Delete book
//http://localhost:3000/book-delete/12345one
app.delete("/book-delete/:isbn", async (req,res) => {
    const {isbn} = req.params;
    const deleteBook = await BookModel.deleteOne({ISBN: isbn});
    return res.json({
        bookDeleted: deleteBook,
        message: "Book was Deleted!!!"
    });
});

// Delete author from book
//http://localhost:3000/book-author-delete/12345one/1
app.delete("/book-author-delete/:isbn/:id", async (req,res) => {
    console.log(req.body);
    console.log(req.params);
    let {isbn, id} = req.params;
    id = Number(id);
    let getSpecificBook = await BookModel.findOne({ISBN: isbn});
    if (getSpecificBook === null){
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    else{
        getSpecificBook.authors.remove(id);
        const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, getSpecificBook, {new:true});
        return res.json({bookUpdated: updateBook,message: "Author was deleted from the Book!!!"});
    }
});

// Delete book from author
//http://localhost:3000/author-book-delete/1/12345one
app.delete("/author-book-delete/:id/:isbn", async (req,res) => {
    console.log(req.body);
    console.log(req.params);
    let {id, isbn } = req.params;
    id = Number(id);
    let getSpecificAuthorByID = await AuthorModel.findOne({id: id});
    if (getSpecificAuthorByID === null){
        return res.json({"error": `No Author found for the id of ${id}`});
    }
    else{
        getSpecificAuthorByID.books.remove(isbn);
        const updateAuthor = await AuthorModel.findOneAndUpdate({id: id}, getSpecificAuthorByID, {new:true});
        return res.json({authorUpdate: updateAuthor,message: "Book was deleted from the Author!!!"});
    }
});

// Delete author
//http://localhost:3000/author-delete/1
app.delete("/author-delete/:id", async (req,res) => {
    let {id} = req.params;
    id = Number(id)
    const deleteAuthor = await AuthorModel.deleteOne({id: id});
    return res.json({
        authorDeleted: deleteAuthor,
        message: "Author was Deleted!!!"
    });
});

// Delete publication
//http://localhost:3000/publication-delete/1
app.delete("/publication-delete/:id", async (req,res) => {
    let {id} = req.params;
    id = Number(id)
    const deletePublication = await PublicationModel.deleteOne({id: id});
    return res.json({
        publicationDeleted: deletePublication,
        message: "Publication was Deleted!!!"
    });
});

//  Delete a book from publication
//http://localhost:3000/publication-book-delete/1/12345one
app.delete("/publication-book-delete/:id/:isbn", async (req,res) => {
    // console.log(req.body);
    // console.log(req.params);
    let {id, isbn } = req.params;
    id = Number(id);
    let getSpecificPublicationByID = await PublicationModel.findOne({id: id});
    if (getSpecificPublicationByID === null){
        return res.json({"error": `No Publication found for the id of ${id}`});
    }
    else{
        getSpecificPublicationByID.books.remove(isbn);
        const updatePublication = await PublicationModel.findOneAndUpdate({id: id}, getSpecificPublicationByID, {new:true});
        return res.json({publicationUpdated: updatePublication,message: "Book was deleted from the Publication!!!"});
    }
});




app.listen(3000, () => {
    console.log("My express app is running");
})

















