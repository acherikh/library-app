import React from 'react';
import { useNavigate } from 'react-router-dom';

import bookPlaceholder from '../img/book-cover-placeholder.png';
import profilePicture from '../img/profile_pic.jpg';

import './Header.css';

const Header = ({
    handlePreviousPage,
    handleNextPage,
    handleDrawer,
}) => {
    const navigate = useNavigate();
    return (
        <header className='library-header'>
            <img
                className='library-logo'
                src={bookPlaceholder}
                onClick={() => navigate('/library')}
            />
            <button onClick={handlePreviousPage}>Previous</button>
            <button onClick={handleNextPage}>Next</button>
            <img
                className='profile-picture'
                src={profilePicture}
                onClick={handleDrawer}
            />
        </header>
    );
};

export default Header;
