let books = [
    {
        ISBN:"12345one",
        title:"Getting started with MERN",
        authors:[1, 2],
        language:"en",
        pubdate:"2021.05.06",
        numOfPage:225,
        category:["JavaScript","web development", "tech"],
        publication: 1
    },
    {
        ISBN:"12345two",
        title:"Getting started with Python",
        authors:[1,2],
        language:"en",
        pubdate:"2021.07.06",
        numOfPage:300,
        category:["programming","app development", "tech"],
        publication: 1
    }
];

let authors = [
    {
        id:1,
        name:"Naveen Weththasinghe",
        books:["12345one","12345two"]
    },
    {
        id:2,
        name:"Nikil agarwal",
        books:["12345one","12345two"]
    }
];

let publications = [
    {
        id:1,
        name:"ShapeAI Publications",
        books:["12345one","12345two"]
    },
    {
        id:2,
        name:"NDW Publications",
        books:[]
    }
];

module.exports = {books, authors, publications};