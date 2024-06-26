import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    let URL;

    if (`${import.meta.env.VITE_NODE_ENV}` === 'development') {
        URL = `${import.meta.env.VITE_PRODUCTION_API_URL}`;
    } else {
        URL = `${import.meta.env.VITE_LOCAL_API_URL}`;
    }

    const ME_URL = `${URL}/api/user/me`;
    const LOGOUT_URL = `${URL}/api/auth/logout`;

    const [dashboard, setDashboard] = useState('');
    const [fetchingLogout, setFetchingLogout] = useState(true);
    const [fetchingDashboard, setFetchingDashboard] = useState(true);
    const [noError, setNoError] = useState(true);

    const fetchMe = async () => {
        try {
            const response = await fetch(ME_URL, {
                method: 'GET',
                credentials: 'include', // <- this is mandatory to deal with cookies
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response) {
                const data = await response.json();
                setDashboard(data);
            }

            setFetchingDashboard(false);
        } catch (err) {
            setNoError(false);
        }
    };

    const fetchLogout = async () => {
        try {
            const response = await fetch(LOGOUT_URL, {
                method: 'PATCH',
                credentials: 'include', // <- this is mandatory to deal with cookies
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response) {
                console.log(response);
                setFetchingLogout(false);
            }
        } catch (err) {
            setNoError(false);
        }
    };

    const handleLogout = () => {
        fetchLogout();
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <div className='dashboard-page'>
            <h1>My Dashboard</h1>

            <Link to='/'>
                <button onClick={handleLogout}>Logout</button>
            </Link>
        </div>
    );
};
export default DashboardPage;
