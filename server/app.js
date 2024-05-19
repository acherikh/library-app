const path = require('path');

const express = require('express');

const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const libraryRouter = require('./routes/libraryRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

app.enable('trust proxy');

app.use(
    cors({
        origin: 'https://library-app-13rn.onrender.com',
        credentials: true,
    })
);

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
// const limiter = rateLimit({
//     max: 100,
//     windowMs: 60 * 60 * 1000,
//     message:
//         'Too many requests from this IP, please try again in an hour!',
// });
// app.use('/api', limiter);

app.use(express.static(`${__dirname}/public`));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            'name',
            'author',
            'genre',
            'photo',
            'pages',
            'publisher',
            'publicationDate',
        ],
    })
);

app.use(compression());

// 3) ROUTES
app.use('/api/auth', authRouter);
app.use('/api/library', libraryRouter);
app.use('/api/user', userRouter);

app.all('*', (req, res, next) => {
    next(
        new AppError(
            `Can't find ${req.originalUrl} on this server!`,
            404
        )
    );
});

app.use(globalErrorHandler);

module.exports = app;
