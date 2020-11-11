'use strict';

const { json } = require('body-parser');
const client = require('./client.js');


var signinChecking = {
    signinFunction: function (obj, res) {
        var userName = obj.user;
        let password = obj.pass
        client.query(`SELECT username, password FROM users;`)
            .then(data => {
                if (data.rowCount > 0) {
                    data.rows.forEach(v => {
                        if (v.username === userName && v.password === password) {
                           
                            res.render('pages/categories/categories.ejs');


                        } else {
                            let errorMessage = `E-mail or password is invalid!`;
                            
                            res.render('pages/signinPages/signinError', { errorMessage: errorMessage });
                        }
                    })
                }else{
                    let errorMessage = `E-mail or password is invalid!`;
                    res.render('pages/signinPages/signinError', { errorMessage: errorMessage });
                }
            }).catch(err => {
                console.log(err);
            })
    },

}

module.exports = signinChecking;