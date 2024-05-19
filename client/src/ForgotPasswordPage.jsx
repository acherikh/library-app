import React, { useState } from 'react';

import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
    const BASE_URL = 'http://localhost:3000/api/user/forgotPassword';

    const [formData, setFormData] = useState({
        email: '',
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
            await fetch(BASE_URL, {
                method: 'POST',
                credentials: 'include', // <- this is mandatory to deal with cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        } catch (err) {
            setNoError(false);
        }
    };

    return (
        <div className='forgot-password-page'>
            <div className='auth-box'>
                <h1>Forgot Password Form</h1>
                <div className='forgot-password-form'>
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
                        <button
                            className='forgot-password-button'
                            type='submit'
                        >
                            Send Mail
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
