// ---------------------------------Main Backend File-------------------------------------

const db = require("./database/index.js");
const BookModel = require("./database/books");

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
//http://localhost:3000/books
app.get("/books", async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
})

//http://localhost:3000/book-isbn/12345two
app.get("/book-isbn/:isbn", (req, res) => {
    const {isbn} = req.params;
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
    if (getSpecificBook.length === 0){
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook[0]);
    
})

//http://localhost:3000/book-category/programming
app.get("/book-category/:category", (req, res) => {
    console.log(req.params);
    const cat = req.params.category;
    console.log(cat);

    const getSpecificBookByCategory = db.books.filter((book) => book.category.includes(cat));  
    if (getSpecificBookByCategory.length === 0){
        return res.json({"error": `No Books found for the category of ${cat}`});
    }
    return res.json(getSpecificBookByCategory);
})
//http://localhost:3000/authors
app.get("/authors",(req,res) => {
    const getAllAuthors = db.authors;
    return res.json(getAllAuthors);
})

//http://localhost:3000/author-id/1
app.get("/author-id/:id", (req, res) => {
    let {id} = req.params;
    id = Number(id);
    const getSpecificAuthorByID = db.authors.filter((author) => author.id === id);
    if (getSpecificAuthorByID.length === 0){
        return res.json({"error": `No Book found for the ID of ${id}`});
    }
    return res.json(getSpecificAuthorByID[0]);
    
})

//http://localhost:3000/author-isbn/12345two
app.get("/author-isbn/:isbn", (req, res) => {
    const {isbn} = req.params;
    const getSpecificAuthorsByISBN = db.authors.filter((author) => author.books.includes(isbn));
    if (getSpecificAuthorsByISBN.length === 0){
        return res.json({"error": `No Author found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificAuthorsByISBN); 
})

//http://localhost:3000/publications
app.get("/publications",(req,res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications);
})

//http://localhost:3000/publication-id/1
app.get("/publication-id/:id", (req, res) => {
    let {id} = req.params;
    id = Number(id);
    const getSpecificPublicationByID = db.publications.filter((publication) => publication.id === id);
    if (getSpecificPublicationByID.length === 0){
        return res.json({"error": `No Publication found for the ID of ${id}`});
    }
    return res.json(getSpecificPublicationByID);
    
})

//http://localhost:3000/publication-isbn/12345two
app.get("/publication-isbn/:isbn", (req, res) => {
    const {isbn} = req.params;
    const getSpecificPublicationByISBN = db.publications.filter((publication) => publication.books.includes(isbn));
    if (getSpecificPublicationByISBN.length === 0){
        return res.json({"error": `No Author found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificPublicationByISBN); 
})

// ---------------------------------POST APIs-------------------------------------

//http://localhost:3000/book
app.post("/book",(req,res) => {
    console.log(req.body);
    db.books.push(req.body);
    return res.json(db.books);
});

//http://localhost:3000/author
app.post("/author",(req,res) => {
    console.log(req.body);
    db.authors.push(req.body);
    return res.json(db.authors);
});

//http://localhost:3000/publication
app.post("/publication",(req,res) => {
    console.log(req.body);
    db.publications.push(req.body);
    return res.json(db.publications);
});

// ---------------------------------POST APIs-------------------------------------

//http://localhost:3000/book-update/12345one
app.put("/book-update/:isbn", (req,res) => {
    console.log(req.body);
    console.log(req.params);
    const {isbn} = req.params;
    db.books.forEach((book) => {
        if (book.ISBN === isbn){
            return {...book, ...req.body};       //book object was override by req.body(new one)  ... - spread operator
        }
        return book;
    })
    return res.json(db.books);
});

//http://localhost:3000/author-update/1
app.put("/author-update/:id", (req,res) => {
    console.log(req.body);
    console.log(req.params);
    let {id} = req.params;
    id = Number(id);
    db.authors.forEach((author) => {
        if (author.id === id){
            return {...author, ...req.body};       
        }
        return author;
    })
    return res.json(db.authors);
});

//http://localhost:3000/publication-update/1
app.put("/publication-update/:id", (req,res) => {
    console.log(req.body);
    console.log(req.params);
    let {id} = req.params;
    id = Number(id);
    db.publications.forEach((publication) => {
        if (publication.id === id){
            return {...publication, ...req.body};       
        }
        return publication;
    })
    return res.json(db.publications);
});

// ---------------------------------DELETE APIs-------------------------------------

// Delete book
//http://localhost:3000/book-delete/12345one
app.delete("/book-delete/:isbn", (req,res) => {
    const {isbn} = req.params;
    const filteredBooks = db.books.filter((book) => book.ISBN !== isbn);
    db.books = filteredBooks;
    return res.json(db.books);
});

// Delete author from book
//http://localhost:3000/book-author-delete/12345one/1
app.delete("/book-author-delete/:isbn/:id", (req,res) => {
    console.log(req.body);
    console.log(req.params);
    let {isbn, id} = req.params;
    id = Number(id);
    db.books.forEach((book) => {
        if (book.ISBN === isbn){
            if (!book.authors.includes(id)){
                return;
            }
            book.authors = book.authors.filter((author) => author!==id);   
            return book;    
        }
        return book;
    })
    return res.json(db.books);
});

// Delete book from author
//http://localhost:3000/author-book-delete/1/12345one
app.delete("/author-book-delete/:id/:isbn", (req,res) => {
    console.log(req.body);
    console.log(req.params);
    let {id, isbn } = req.params;
    id = Number(id);
    db.authors.forEach((author) => {
        if (author.id === id){
            if (!author.books.includes(isbn)){
                return;
            }
            author.books = author.books.filter((book) => book!==isbn);   
            return author;    
        }
        return author;
    })
    return res.json(db.authors);
});

// Delete author
//http://localhost:3000/author-delete/1
app.delete("/author-delete/:id", (req,res) => {
    let {id} = req.params;
    id = Number(id)
    const filteredAuthors = db.authors.filter((author) => author.id !== id);
    db.authors = filteredAuthors;
    return res.json(db.authors);
});

// Delete publication
//http://localhost:3000/publication-delete/1
app.delete("/publication-delete/:id", (req,res) => {
    let {id} = req.params;
    id = Number(id)
    const filteredPublications = db.publications.filter((publication) => publication.id !== id);
    db.publications = filteredPublications;
    return res.json(db.publications);
});

//  Delete a book from publication
//http://localhost:3000/publication-book-delete/1/12345one
app.delete("/publication-book-delete/:id/:isbn", (req,res) => {
    // console.log(req.body);
    // console.log(req.params);
    let {id, isbn } = req.params;
    id = Number(id);
    db.publications.forEach((publication) => {
        if (publication.id === id){
            if (!publication.books.includes(isbn)){
                return;
            }
            publication.books = publication.books.filter((book) => book!==isbn);   
            return publication;    
        }
        return publication;
    })
    return res.json(db.publications);
});




app.listen(3000, () => {
    console.log("My express app is running");
})

















