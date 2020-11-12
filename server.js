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
const getBook = require('./modules/getBooks.js');
const bokkDetails = require('./modules/bookDetails.js');
const myFavBooks = require('./modules/favBook.js');
const deleteBook = require('./modules/deleteBook.js');
const insertBook = require('./modules/insertBook.js');
const updateBook = require('./modules/updateBook.js');

// -------------------------------------------------------------------------------------------------------------------
// Request for our app

app.get('/', jounyRender);
app.get('/index', renderSignin);
app.get('/signup-page', renderSignup);
app.post('/signin', signin);
app.post('/signup', signUp);
app.get('/gallery', showGallery);
app.get('/search', gallerySearchResults);
app.get('/inspire', renderInspire);
app.get('/book', bookSearchPage);
app.get('/category',categoryRender)
app.post('/searches', getingBooks);
app.get('/books/:id',handleBooks);
app.post('/books', HandellBooks);
app.get('/myFavBooks',favBook);
app.put ('/books/:id', bookUpdate);
app.delete('/books/:id',handleDeleteBook);
app.get('/about',about);
app.get('/clock',clock);
app.get('/*',notFound);


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

function favBook(req,res){
    myFavBooks.favBooks(req,res);
};

// -------------------------------------------------------------------------------------------------------------------
// Delete from Fav function

function handleDeleteBook(req,res){
    deleteBook.deleteBook(req,res);
}

// -------------------------------------------------------------------------------------------------------------------
// Update Books info function

function bookUpdate(req,res){
    updateBook.updateBook(req,res);
}

// -------------------------------------------------------------------------------------------------------------------
// Insert Books info function

function HandellBooks(req, res){
    insertBook.insertBook(req,res);
  }

// -------------------------------------------------------------------------------------------------------------------
// Books searches results page rendering function

function getingBooks(req, res) {
    getBook.getBook(req,res);
}

// -------------------------------------------------------------------------------------------------------------------
// Book details page rendering function

function handleBooks(req,res){
    bokkDetails.bookDetali(req,res);
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