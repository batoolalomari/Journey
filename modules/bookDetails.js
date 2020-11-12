'use strict';


const client = require('./client.js');


var bookDetali = {
    bookDetali : function (req,res){
        let URLid = req.params.id;
        let DB = `SELECT * FROM journybooks WHERE id = ${URLid};`;
        client.query(DB).then((data) => {
            res.render('pages/books/books/show',{x:data.rows[0]});
        });
    }
}

module.exports = bookDetali;