import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import LibraryPage from './pages/LibraryPage';
import BookPage from './pages/BookPage';
import AuthorPage from './pages/AuthorPage';

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';

import DashboardPage from './pages/DashboardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UpdateMePage from './pages/UpdateMePage';
import MyBooksPage from './pages/MyBooksPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={<Navigate to='/auth/signup' replace />}
                />

                <Route path='/auth/signup' element={<SignupPage />} />
                <Route path='/auth/login' element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path='/auth/logout'
                        element={<LogoutPage />}
                        exact
                    />

                    <Route
                        element={<LibraryPage />}
                        path='/library'
                    />
                    <Route
                        element={<BookPage />}
                        path='/library/book/:bookName'
                    />
                    <Route
                        path='/library/author/:authorName'
                        element={<AuthorPage />}
                    />

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
                </Route>

                <Route
                    path='*'
                    element={<Navigate to='/auth/login' replace />}
                />
            </Routes>
        </Router>
    );
}

export default App;
