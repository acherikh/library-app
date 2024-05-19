import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './ResetPasswordPage.css';

function ResetPasswordPage() {
    const params = useParams();

    const BASE_URL = `http://localhost:3000/api/user/resetPassword/${params.token}`;

    const [formData, setFormData] = useState({
        password: '',
        passwordConfirm: '',
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
                method: 'PATCH',
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
        <div className='reset-password-page'>
            <div className='auth-box'>
                <h1>Reset Password Form</h1>
                <div className='reset-password-form'>
                    <form onSubmit={handleSubmit}>
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
                        <Link to='/auth/login'>
                            <button
                                className='reset-password-button'
                                type='submit'
                            >
                                Reset Password
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
