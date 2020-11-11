'use strict';

// Require dependencies

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const methodoverride = require('method-override');
const superagent = require('superagent');
// -------------------------------------------------------------------------------------------------------------------
// our app use

const app = express();
app.use(cors());
app.use(methodoverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('./public'));
app.set('view engine', 'ejs');
// -------------------------------------------------------------------------------------------------------------------
// Reqired KEYS

const PORT = process.env.PORT;
// -------------------------------------------------------------------------------------------------------------------
// Our dependencies
const client = require('./modules/client.js');
const signinObject = require('./modules/signinChecking.js');
const signinChecking = require('./modules/signupChecking.js');
const galleryResults = require('./modules/gallerySearchResults.js');





// -------------------------------------------------------------------------------------------------------------------
// Request for our app

app.get('/', jounyRender);
app.get('/index', renderSignin);
app.get('/signup-page', renderSignup);
app.post('/signin', signin);
app.post('/signup', signUp);
app.get('/gallery', showGallery);
app.get('/search2', gallerySearchResults);
app.get('/inspire', renderInspire);
app.get('/book', bookSearchPage);
app.get('/category',categoryRender)
app.post('/searches', getingBooks);
app.get('/books/:id',handleBooks);
app.post('/books', HandellBooks);
app.get("/myFavBooks",favBook);
app.put ('/books/:id', bookUpdate);
app.delete('/books/:id',handleDeleteBook);
app.get('/about',about);
app.get('/clock',clock);
app.get('/*',notFound);


function handleDeleteBook(request,response){
    let dataFromForm = request.body.id;    //id from the books/show page
    let statement =`DELETE FROM journybooks WHERE id=${dataFromForm};`;
    client.query(statement).then(data =>{
        
        response.redirect('/book');
    }).catch((error) => {
        console.log('error happend in the delete data...',error);
      });
}

function bookUpdate(req,res){
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

function favBook(request,response){
    let DB = `SELECT * FROM journybooks;`;
    client.query(DB).then((data)=>{
        //variable to save the rows from the data object
        let DBrow = data.rows;
        //display 
        response.render('pages/books/index',{x:DBrow,y:data.rowCount}); 
    })
    .catch(error =>{
        console.log('error in favourite books');
    })
};

function HandellBooks(req, res){
  let newBookAdded = req.body;
  let statement = `INSERT INTO journybooks (title, Author, isbn, image_url, descr) VALUES ($1,$2,$3,$4,$5) RETURNING id ;`;
  let values = [newBookAdded.title,newBookAdded.author,newBookAdded.isbn,newBookAdded.image_url,newBookAdded.descr];
  client.query(statement,values).then( data =>{
    
    res.redirect(`/books/${data.rows[0].id}`);

  }).catch((error) => {
    console.log('error happend in the HandellBookID SQL',error);
  });
}



function handleBooks(request,response){
    let URLid = request.params.id;
    let DB = `SELECT * FROM journybooks WHERE id = ${URLid};`;
    client.query(DB).then((data) => {
        response.render('pages/books/books/show',{x:data.rows[0]});
    });
}
// function HandellBooks(req, res) {
    
//     let newBookAdded = req.body;
//     let check;
//     client.query(`SELECT book_id FROM journybooks;`)
   
//         .then(v => {
//             if(v.rows.length==0){
//                 let statement = `INSERT INTO journybooks (title, author, isbn, image_url, descr, book_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING book_id;`;
//                 let values = [newBookAdded.title, newBookAdded.author, newBookAdded.isbn, newBookAdded.image_url, newBookAdded.descr, newBookAdded.id];
        
//                 client.query(statement, values)
//                     .then(data => {
//                         let sql = `INSERT INTO conTable (books) VALUES ($1);`
//                         let val = [data.rows[0].book_id];
//                         client.query(sql,val)
        
//                     }).then(() => {
                       
//                         client.query(`SELECT id FROM users WHERE username = '${userName}';`)
                        
//                     }).then(value => {
                        
//                         client.query(`UPDATE conTable SET user_id = ${value};`)
//                     }) .catch((error) => {
//                         console.log('error happend in the HandellBookID SQL', error);
//                     });
//             }
//             v.rows.map(ele => {
                
//                 if (ele === newBookAdded.id) {
                    
//                     check = true;
//                 } else { check = false; }
//             })
//         })

//     if (check==false) {
//         let statement = `INSERT INTO journybooks (title, author, isbn, image_url, descr, book_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING book_id;`;
//         let values = [newBookAdded.title, newBookAdded.author, newBookAdded.isbn, newBookAdded.image_url, newBookAdded.descr, newBookAdded.id];

//         client.query(statement, values)
//             .then(data => {
//                 let sql = `INSERT INTO conTable (books) VALUES ($1);`
//                 let val = [data.rows[0].book_id];
//                 client.query(sql,val)

//             }).then(() => {
               
//                 client.query(`SELECT id FROM users WHERE username = '${userName}';`)
                
//             }).then(value => {
                
//                 client.query(`UPDATE conTable SET user_id = ${value};`)
//             }) .catch((error) => {
//                 console.log('error happend in the HandellBookID SQL', error);
//             });
//     }
// }

// -------------------------------------------------------------------------------------------------------------------
// Journy page rendering function
function jounyRender(req, res) {
    res.render('pages/index/index');
}
// -------------------------------------------------------------------------------------------------------------------
// Sign-In page rendering function
function renderSignin(req, res) {
    res.render('pages/signinPages/signin');
}

// -------------------------------------------------------------------------------------------------------------------
// Sign-Up page rendering function
function renderSignup(req, res) {
    res.render('pages/signupPages/signup');
}

// -------------------------------------------------------------------------------------------------------------------
// User information checking function
function signin(req, res) {
    var userName = req.body.username;
    let password = req.body.password;
    let obj = { user: userName, pass: password };
    signinObject.signinFunction(obj, res);
    return userName;

}


// -------------------------------------------------------------------------------------------------------------------
// User information inserting function

function signUp(req, res) {
    let userName = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let obj = { user: userName, pass: password, confirm: confirmPassword };
    signinChecking.signinFunction(obj, res)
}

// -------------------------------------------------------------------------------------------------------------------
// Category page rendering function
function categoryRender(req,res){
    res.render('pages/categories/categories')
}
// -------------------------------------------------------------------------------------------------------------------
// Gallery page rendering function

function showGallery(req, res) {
    res.render('pages/gallery/gallerySearch')
}
// -------------------------------------------------------------------------------------------------------------------
// Gallery Search Results function

function gallerySearchResults(req, res) {

    let filter = req.query.search;
    galleryResults.searchResults(filter, res);

}

// -------------------------------------------------------------------------------------------------------------------
// Inspire page rendering function

function renderInspire(req, res) {
    res.render('pages/inspire/inspire');
}

// -------------------------------------------------------------------------------------------------------------------
// Books page rendering function

function bookSearchPage(req, res) {
    res.render('pages/books/searches/new')
}

// -------------------------------------------------------------------------------------------------------------------
// Favourite Books page rendering function

// function favBook(req,res){
//     let DB = `SELECT * FROM users;`;
//     client.query(DB).then((data)=>{
//         //variable to save the rows from the data object
//         let DBrow = data.rows;
//         //display 
//         response.render('pages/index',{x:DBrow,y:data.rowCount}); 
//     })
//     .catch(error =>{
//         console.log('error in favourite books');
//     })
// }
// -------------------------------------------------------------------------------------------------------------------
// Books searches results page rendering function

function getingBooks(req, res) {
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

function Book(bookObj) {
    this.title = bookObj.volumeInfo.title ? bookObj.volumeInfo.title : 'No title Found';
    this.author = bookObj.volumeInfo.authors ? bookObj.volumeInfo.authors : 'No authors Found';
    this.description = bookObj.volumeInfo.description ? bookObj.volumeInfo.description : 'No Description Found';
    this.image = bookObj.volumeInfo.imageLinks ? bookObj.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg';
    this.id = bookObj.id ? bookObj.id : 'No title Found';
}

// -------------------------------------------------------------------------------------------------------------------
// About page rendering function
function about(req,res){
    res.render('pages/about/aboutUs')
}

// -------------------------------------------------------------------------------------------------------------------
// Clock page rendering function
function clock(req,res){
    res.render('pages/clock/clock');
}

// -------------------------------------------------------------------------------------------------------------------
// 404 page rendering function
function notFound(req,res){
    res.render('pages/error/notFound')
}
// -------------------------------------------------------------------------------------------------------------------
// server starting function

client.connect().then(() => {
    app.listen(PORT, () => {
        console.log('app is listning on port' + PORT);
    });
}).catch(err => {
    console.log('Sorry there is an error' + err);
});