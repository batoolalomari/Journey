'use strict';


const client = require('./client.js');

var updateBook = {
    updateBook: function(req,res){
        let recievedUpdate = req.body;
        let statement = `UPDATE journybooks SET title =$1, Author=$2, isbn=$3, image_url=$4, descr=$5  WHERE id=$6;`;
        let values = [recievedUpdate.title, recievedUpdate.author, recievedUpdate.isbn, recievedUpdate.image_url, recievedUpdate.descr, recievedUpdate.id];
        client.query(statement, values).then( data =>{
          res.redirect(`/books/${recievedUpdate.id}`);
          console.log('item updated ' + recievedUpdate.id);
        }).catch((error) => {
          console.log('error happend in the updated data...',error);
        });
    }
}

module.exports = updateBook;