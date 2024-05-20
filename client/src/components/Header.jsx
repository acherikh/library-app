import React from 'react';
import { useNavigate } from 'react-router-dom';

import bookPlaceholder from '../img/book-cover-placeholder.png';
import profilePicture from '../img/profile_pic.jpg';

import './Header.css';

const Header = ({ handleDrawer }) => {
    const navigate = useNavigate();
    return (
        <header className='library-header'>
            <img
                className='library-logo'
                src={bookPlaceholder}
                onClick={() => navigate('/library')}
            />
            <div className='search-container'>
                <input
                    type='text'
                    id='searchInput'
                    placeholder='Search book...'
                />
                <button id='searchButton'>
                    <img src='https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png' />
                </button>
            </div>

            <img
                className='profile-picture'
                src={profilePicture}
                onClick={handleDrawer}
            />
        </header>
    );
};

export default Header;
