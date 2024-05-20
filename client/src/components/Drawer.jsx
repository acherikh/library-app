import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Drawer.css';

const Drawer = ({ isDrawerOpen }) => {
    const navigate = useNavigate();
    return (
        <div className={`user-drawer ${isDrawerOpen ? 'open' : ''}`}>
            <button className='drawer-button'>Dashboard</button>
            <button
                className='drawer-button'
                onClick={() => navigate('/user/my-books')}
            >
                My Books
            </button>
            <button className='drawer-button'>Log Out</button>
        </div>
    );
};

export default Drawer;
