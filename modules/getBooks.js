'use strict';


const client = require('./client.js');
const superagent = require('superagent');


var getBook = {
    getBook : function (req,res){
        let q = '';
        if (req.body.search[1] === 'title') { q = `+intitle:${req.body.search[0]}` };
        if (req.body.search[1] === 'authors') { q = `+inauthor:${req.body.search[0]}` };
    
        superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`)
            .then(bookResult => {
                let booksItems = bookResult.body.items;
                let selctedBooksArr = booksItems.map(info => {
                    return new Book(info);
                });
                // console.log(selctedBooksArr);
                res.render('pages/books/searches/show', { key: selctedBooksArr });
            }).catch(error => {
                // response.send('sorry, the book is not available at the moment.');
                res.render('pages/books/searches/not-foud.ejs');
            });
    }
}

function Book(bookObj) {
    this.title = bookObj.volumeInfo.title ? bookObj.volumeInfo.title : 'No title Found';
    this.author = bookObj.volumeInfo.authors ? bookObj.volumeInfo.authors : 'No authors Found';
    this.description = bookObj.volumeInfo.description ? bookObj.volumeInfo.description : 'No Description Found';
    this.image = bookObj.volumeInfo.imageLinks ? bookObj.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg';
    this.id = bookObj.id ? bookObj.id : 'No title Found';
}

module.exports = getBook;