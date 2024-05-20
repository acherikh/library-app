import React from 'react';

import './BookContainer.css';
import bookPlaceholder from '../img/book-cover-placeholder.png';

const BookContainer = ({ book, onAction, actionText }) => {
    const handleAction = () => {
        onAction(book._id);
    };

    return (
        <div className='book-box'>
            <div className='book-thumbnail'>
                <img src={bookPlaceholder} alt='Book Thumbnail' />
            </div>
            <div className='book-infos'>
                <div className='book-title'>
                    <strong>{book.name}</strong>
                </div>
                <div className='book-details'>
                    <div className='book-author'>
                        Author: {book.author}
                    </div>
                    <div className='book-genre'>
                        Genre: {book.genre}
                    </div>
                    <div className='book-year'>Year: {book.year}</div>
                    <div className='book-pages'>
                        Pages: {book.pages}
                    </div>
                </div>
            </div>
            <div
                className={
                    actionText === 'Remove from my library'
                        ? 'remove-button-container'
                        : 'add-button-container'
                }
            >
                <button
                    className={
                        actionText === 'Remove from my library'
                            ? 'remove-button'
                            : 'add-button'
                    }
                    onClick={handleAction}
                >
                    {actionText}
                </button>
            </div>
        </div>
    );
};

export default BookContainer;
