const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');
const refactorController = require('../controllers/refactorController');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.getUserBooks = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const userBooks = user.books;

    res.status(200).json({
        status: 'success',
        message: 'Correctly fetched users books',
        results: userBooks.length,
        data: {
            userBooks,
        },
    });
});

exports.getUserBook = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const book = user.books.filter((book) =>
        book.equals(req.params.id)
    )[0];

    res.status(200).json({
        status: 'success',
        message: 'Correctly fetched users books',
        data: {
            book,
        },
    });
});

exports.addBookToMyLibrary = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.user.id);

        const isInArray = user.books.some(function (book) {
            return book.equals(req.params.id);
        });

        if (isInArray) {
            return next(
                new AppError(
                    'You already have this book in your library !',
                    403
                )
            );
        }

        user.books.push(req.params.id);
        user.save();

        res.status(200).json({
            status: 'success',
            message: 'Book added successfully !',
        });
    }
);

exports.removeBookFromMyLibrary = catchAsyncError(
    async (req, res, next) => {
        let user = await User.findById(req.user.id);

        user.books = user.books.filter(
            (book) => !book.equals(req.params.id)
        );
        user.save();

        res.status(204).json({
            status: 'success',
            message: 'Successfully deleted book.',
        });
    }
);

exports.updateMe = catchAsyncError(async (req, res, next) => {
    // 1) Check if user tries to update password data

    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'If you want to update your password, go to the forgot password page.'
            ),
            403
        );
    }

    // 2) Filter out unwanted fields

    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        { new: true, runValidators: true }
    );

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});

exports.deleteMe = catchAsyncError(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

exports.getAllUsers = refactorController.getOne(User);

exports.getUser = refactorController.getOne(User);

exports.createUser = refactorController.createOne(User);

exports.updateUser = refactorController.updateOne(User);

exports.deleteUser = refactorController.deleteOne(User);
