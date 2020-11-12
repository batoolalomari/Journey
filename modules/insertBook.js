'use strict';


const client = require('./client.js');

var insertBook ={
    insertBook: function(req,res){
        let newBookAdded = req.body;
        let statement = `INSERT INTO journybooks (title, Author, isbn, image_url, descr) VALUES ($1,$2,$3,$4,$5) RETURNING id ;`;
        let values = [newBookAdded.title,newBookAdded.author,newBookAdded.isbn,newBookAdded.image_url,newBookAdded.descr];
        client.query(statement,values).then( data =>{
          
          res.redirect(`/books/${data.rows[0].id}`);
      
        }).catch((error) => {
          console.log('error happend in the HandellBookID SQL',error);
        });
    }
};

module.exports = insertBook;