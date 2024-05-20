import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();

    let URL;
    if (`${import.meta.env.VITE_NODE_ENV}` === 'development') {
        URL = `${import.meta.env.VITE_PRODUCTION_API_URL}`;
    } else {
        URL = `${import.meta.env.VITE_LOCAL_API_URL}`;
    }

    const BASE_URL = `${URL}/api/auth/logout`;
    let [isLoggedOut, setIsLoggedOut] = useState(false);
    const [noError, setNoError] = useState(true);

    useEffect(() => {
        const logOut = async () => {
            await fetch(BASE_URL, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setIsLoggedOut(true);
            navigate('/auth/login');
        };
        logOut();
    }, []);
};

export default LogoutPage;
