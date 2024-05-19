const Book = require('../models/bookModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const refactorController = require('../controllers/refactorController');

exports.getLibrary = refactorController.getAll(Book);

exports.getBook = refactorController.getOne(Book);

exports.getBookByName = catchAsyncError(async (req, res, next) => {
    const book = await Book.find({
        slugName: `${req.params.bookName}`,
    }).select('-__v -id');

    if (!book) {
        // If no book is found with the given ID, throw an error
        throw new AppError('No book found with this name !', 404);
    }

    res.status(200).json({
        status: 'success',
        data: {
            instance,
        },
    });
});

exports.getBooksFromAuthor = catchAsyncError(
    async (req, res, next) => {
        const features = new APIFeatures(
            Book.find({ slugAuthor: `${req.params.authorName}` }),
            req.query
        )
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const books = await features.query;
        res.status(200).json({
            status: 'success',
            results: books.length,
            data: {
                instances,
            },
        });
    }
);

exports.createBook = refactorController.createOne(Book);

exports.deleteBook = refactorController.deleteOne(Book);

exports.updateBook = refactorController.updateOne(Book);
