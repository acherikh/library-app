import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const ME_URL = 'http://localhost:3000/api/user/me';
    const LOGOUT_URL = 'http://localhost:3000/api/auth/logout';

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
