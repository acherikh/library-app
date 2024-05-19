import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';

import LibraryPage from './LibraryPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';
import UpdateMePage from './UpdateMePage';
import MyBooksPage from './MyBooksPage';
import BookPage from './BookPage';
import AuthorPage from './AuthorPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={<Navigate to='/auth/signup' replace />}
                />
                <Route path='/library/' element={<LibraryPage />} />
                <Route
                    path='/library/book/:bookName'
                    element={<BookPage />}
                />
                <Route
                    path='/library/author/:authorName'
                    element={<AuthorPage />}
                />
                <Route path='/auth/signup' element={<SignupPage />} />
                <Route path='/auth/login' element={<LoginPage />} />
                <Route
                    path='/user/dashboard'
                    element={<DashboardPage />}
                />
                <Route
                    path='/user/forgot-password'
                    element={<ForgotPasswordPage />}
                />
                <Route
                    path='/user/reset-password/:token'
                    element={<ResetPasswordPage />}
                />
                <Route
                    path='/user/update'
                    element={<UpdateMePage />}
                />
                <Route
                    path='/user/my-books'
                    element={<MyBooksPage />}
                />
                <Route
                    path='*'
                    element={<Navigate to='/library' replace />}
                />
            </Routes>
        </Router>
    );
}

export default App;
