'use strict';


const client = require('./client.js');


var signinChecking = {
    signinFunction: function (obj, res) {
        var userName = obj.user;
        let password = obj.pass
        client.query(`SELECT id FROM users WHERE username='${userName}' AND password='${password}';`)
            .then(data => {

                if (data.rowCount > 0) {


                    res.render('pages/categories/categories.ejs');



                    // else {
                    //     let errorMessage = `E-mail or password is invalid!`;

                    //     res.render('pages/signinPages/signinError', { errorMessage: errorMessage });
                    // }

                }
                else {
                    let errorMessage = `E-mail or password is invalid!`;

                    res.render('pages/signinPages/signinError', { errorMessage: errorMessage });
                }
            }).catch(err => {
                console.log(err);
            })
    },

}

module.exports = signinChecking;