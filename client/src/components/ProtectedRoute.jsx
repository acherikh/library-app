import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [fetchingAuthentication, setFetchingAuthentication] =
        useState(true);

    useEffect(() => {
        const authVerification = async () => {
            let URL;
            if (
                `${import.meta.env.VITE_NODE_ENV}` === 'development'
            ) {
                URL = `${import.meta.env.VITE_PRODUCTION_API_URL}`;
            } else {
                URL = `${import.meta.env.VITE_LOCAL_API_URL}`;
            }
            const BASE_URL = `${URL}/api/library`;

            const response = await fetch(BASE_URL, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.status === 'success') {
                setAuthenticated(true);
            }
            setFetchingAuthentication(false);
        };
        authVerification();
    }, []);

    if (fetchingAuthentication) {
        return null;
    }
    return authenticated ? <Outlet /> : <Navigate to='/auth/login' />;
};

export default ProtectedRoute;
