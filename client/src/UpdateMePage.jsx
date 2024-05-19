import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateMePage() {
    const params = useParams();
    const navigate = useNavigate();

    let URL;
    if (`${import.meta.env.VITE_NODE_ENV}` === 'development') {
        URL = `${import.meta.env.VITE_PRODUCTION_API_URL}`;
    } else {
        URL = `${import.meta.env.VITE_LOCAL_API_URL}`;
    }

    const BASE_URL = `${URL}/api/user/updateMe`;

    const [formData, setFormData] = useState({
        name: '',
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
                method: 'PATCH',
                credentials: 'include', // <- this is mandatory to deal with cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response) {
                const data = await response.json();
                if (data.status === 'success') {
                    navigate('/login');
                }
            }
        } catch (err) {
            setNoError(false);
        }
    };

    return (
        <div className='ResetPassword-page'>
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>New username :</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>New email :</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit'>Update Settings</button>
            </form>
        </div>
    );
}

export default UpdateMePage;
