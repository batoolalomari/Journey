'use strict';

const client = require('./client.js');


var checkNotInsideDatabase = true;
var signinChecking = {

    signinFunction: function (obj, res) {

        let userName = obj.user;
        let password = obj.pass;
        let confirmPassword = obj.confirm;
        client.query(`SELECT username FROM users;`)
            .then(data => {

                data.rows.forEach(v => {
                    if (v.username === userName) {
                        checkNotInsideDatabase = false;
                        let usernameError = `${userName} is alredy exist`;
                        res.render('pages/signupPages/signupError', { errorMessage: usernameError });
                    }
                })
            })
            .then(() => {
                if (password !== confirmPassword) {
                    //     // Incorrect password!
                    let confirmError = `You should use same password`;
                    res.render('pages/signupPages/signupError', { errorMessage: confirmError });
                }
                if (password === confirmPassword && checkNotInsideDatabase) {

                    let SQL = `INSERT INTO users(username, password) VALUES ($1, $2);`;
                    let value = [userName, password];
                    return client.query(SQL, value).then(() => {
                        res.render('pages/signinPages/signin');
                    })
                }


            })
    }
}

module.exports = signinChecking;

//  /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.(com||net||org)$/g
// one word, or two words separated by dash or underscore , before the @ symbol
// - can contain numbers
// - can have any of the following top-level domains: .net, .com, or .org
// - no other special characters
// - no subdomains, ports, etc: must be of the form name@place.com, not name@sub.place.com:3000


//  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/g
//To check a password between 8 to 15 characters which contain at least one lowercase letter,
// one uppercase letter, one numeric digit, and one special character