const AppError = require('./../utils/appError');

const handleCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
    const value = err.keyValue[Object.keys(err.keyValue)[0]];

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });

        // Programming or other unknown error: don't leak error details
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong. Please try again.',
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'local'
    ) {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }

        let error = { ...err, name: err.name };

        if (error.name === 'CastError')
            error = handleCastError(error);
        if (error.code === 11000)
            error = handleDuplicateFields(error);
        if (error.name === 'ValidationError')
            error = handleValidationError(error);

        sendErrorProd(error, res);
    }
};
