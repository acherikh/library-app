import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../styles/LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();

    let URL;
    if (`${import.meta.env.VITE_NODE_ENV}` === 'development') {
        URL = `${import.meta.env.VITE_PRODUCTION_API_URL}`;
    } else {
        URL = `${import.meta.env.VITE_LOCAL_API_URL}`;
    }

    const BASE_URL = `${URL}/api/auth/login`;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [noError, setNoError] = useState(true);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                credentials: 'include', // <- this is mandatory to deal with cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response) {
                const data = await response.json();
                if (data.status === 'success') {
                    setIsLoggedIn(true);
                    navigate('/library');
                } else {
                    setErrorMessage(data.message);
                }
            }
        } catch (err) {
            setNoError(false);
        }
    };

    return (
        <div className='signin-page'>
            <div className='auth-box'>
                <h1>Signin Form</h1>
                <div className='signin-form'>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errorMessage && (
                            <div className='error-message'>
                                {errorMessage}
                            </div>
                        )}
                        <div className='forgot-password'>
                            <Link to='/user/forgot-password'>
                                <p>Forgot Password ?</p>
                            </Link>
                        </div>
                        <div className='button-flex'>
                            <button
                                className='signin-button'
                                type='submit'
                            >
                                Sign In
                            </button>
                            <Link to='/auth/signup'>
                                <p className='signup-text'>Sign Up</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
