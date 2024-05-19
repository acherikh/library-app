import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './LoginPage.css';

function LoginPage() {
    const BASE_URL =
        'https://library-app-api-prod.onrender.com/api/auth/login';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
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
                    navigate('/library');
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
                        <button
                            className='signin-button'
                            type='submit'
                        >
                            Sign In
                        </button>
                    </form>
                    <Link className='signup-text' to='/auth/signup'>
                        <p>Sign Up</p>
                    </Link>
                    <Link to='/user/forgot-password'>
                        <p className='forgot-password-text'>
                            Forgot Password ?
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
