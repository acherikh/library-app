const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);

router.get(
    '/myBooks',
    userController.getMe,
    userController.getUserBooks
);

router.delete('/myBooks/:id', userController.removeBookFromMyLibrary);

router.patch(
    '/updateMe',
    userController.updateMe,
    userController.getUser
);

router.delete('/deleteMe', userController.deleteMe);

// PASSWORDS

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// ADMIN FUNCTIONS

router
    .route('/')
    .get(
        authController.restricted('admin'),
        userController.getAllUsers
    )
    .post(
        authController.restricted('admin'),
        userController.createUser
    );

router
    .route('/:id')
    .get(userController.getUser)
    .patch(
        authController.restricted('admin'),
        userController.updateUser
    )
    .delete(
        authController.restricted('admin'),
        userController.deleteUser
    );

module.exports = router;
