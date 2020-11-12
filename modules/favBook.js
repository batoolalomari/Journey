'use strict';


const client = require('./client.js');



var favBook = {
    favBooks: function(req,res){
        console.log('1');
        let DB = `SELECT * FROM journybooks;`;
        client.query(DB)
        .then((data)=>{
            console.log(data);
            //variable to save the rows from the data object
            let DBrow = data.rows;
            //display 
            
            res.render('pages/books/index',{x:DBrow,y:data.rowCount}); 
        })
        .catch(error =>{
            console.log('error in favourite books'+ error);
        })
    }
}

module.exports = favBook;