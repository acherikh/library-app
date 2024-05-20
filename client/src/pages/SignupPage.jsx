import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../styles/SignupPage.css';

function SignupPage() {
    const navigate = useNavigate();

    let URL;
    if (`${import.meta.env.VITE_NODE_ENV}` === 'development') {
        URL = `${import.meta.env.VITE_PRODUCTION_API_URL}`;
    } else {
        URL = `${import.meta.env.VITE_LOCAL_API_URL}`;
    }

    const BASE_URL = `${URL}/api/auth/signup`;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(BASE_URL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    navigate('/library');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className='signup-page'>
            <div className='auth-box'>
                <h1>Signup Form</h1>
                <div className='signup-form'>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Username'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
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
                        <input
                            type='password'
                            id='passwordConfirm'
                            name='passwordConfirm'
                            placeholder='Confirm Password'
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                            required
                        />
                        <div className='button-flex'>
                            <button
                                className='signup-button'
                                type='submit'
                            >
                                Sign Up
                            </button>
                            <Link to='/auth/login'>
                                <p className='sign-in-button'>
                                    Sign In
                                </p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
