const express = require('express');
const libraryController = require('../controllers/libraryController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.use(authController.protect);

router
    .route('/:id')
    .get(libraryController.getBook)
    .patch(userController.addBookToMyLibrary)
    .patch(libraryController.updateBook)
    .delete(libraryController.deleteBook);

router
    .route('/')
    .get(libraryController.getLibrary)
    .post(libraryController.createBook);

router
    .route('/author/:authorName')
    .get(libraryController.getBooksFromAuthor)
    .patch(userController.addBookToMyLibrary);

router
    .get('/book/:bookName', libraryController.getBookByName)
    .patch(userController.addBookToMyLibrary);

module.exports = router;
