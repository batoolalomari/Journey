'use strict';


const client = require('./client.js');


var deleteBook = {
    deleteBook: function(req,res){
        let dataFromForm = req.body.id;    //id from the books/show page
        let statement =`DELETE FROM journybooks WHERE id=${dataFromForm};`;
        client.query(statement).then(data =>{
            
            res.redirect('/book');
        }).catch((error) => {
            console.log('error happend in the delete data...',error);
          });
    }
}

module.exports = deleteBook;