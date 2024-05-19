import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './MyBooksPage.css';

import bookPlaceholder from '../img/book-cover-placeholder.png';
import profilePicture from '../img/profile_pic.jpg';

const MyBooksPage = () => {
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const BASE_URL = `https://library-app-api-prod.onrender.com/api/user/myBooks?limit=${itemsPerPage}&page=${currentPage}&sort=name`;

    const [myBooks, setMyBooks] = useState([]);
    const [fetchingMyBooks, setFetchingMyBooks] = useState(true);
    const [noError, setNoError] = useState(true);

    const fetchMyBooks = async () => {
        try {
            const response = await fetch(BASE_URL, {
                method: 'GET',
                credentials: 'include', // <- this is mandatory to deal with cookies
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response) {
                const data = await response.json();
                setMyBooks(data.data.userBooks);
                setFetchingMyBooks(false);
            }
        } catch (err) {
            setNoError(false);
        }
    };
    useEffect(() => {
        fetchMyBooks();
    }, []);

    const fetchLibrarypage = async () => {
        try {
            const response = await fetch(BASE_URL, {
                method: 'GET',
                credentials: 'include', // <- this is mandatory to deal with cookies
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response) {
                const data = await response.json();
                setTotalCount(data.results);
                setMyBooks(data.data.userBooks);
            }

            setFetchingMyBooks(false);
        } catch (err) {
            setNoError(false);
        }
    };
    useEffect(() => {
        fetchLibrarypage();
    }, [currentPage, itemsPerPage]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((currentPage) => currentPage - 1);
        }
    };

    const handleRemoveFromLibrary = async (id) => {
        try {
            await fetch(
                `https://library-app-api-prod.onrender.com/api/library/${id}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            fetchMyBooks();
        } catch (err) {
            setNoError(false);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((currentPage) => currentPage + 1);
        }
    };

    return (
        <div className='my-books-page'>
            <header className='my-books-header'>
                <img
                    className='library-logo'
                    src={bookPlaceholder}
                    onClick={() => window.open('/library', '_self')}
                />
                <button onClick={handlePreviousPage}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
                <img
                    className='profile-picture'
                    src={profilePicture}
                    onClick={() =>
                        window.open('/user/my-books', '_self')
                    }
                />
            </header>
            <div className='books-container'>
                {myBooks.map((book) => (
                    <div className='book-box' key={book._id}>
                        <div className='book-thumbnail'>
                            <img src={bookPlaceholder} />
                        </div>
                        <div className='book-infos'>
                            <div className='book-title'>
                                <strong>{book.name}</strong>
                            </div>
                            <div>Author: {book.author}</div>
                            <div>Genre: {book.genre}</div>
                            <div>Year: {book.year}</div>
                            <div>Pages: {book.pages}</div>
                        </div>
                        <div className='remove-button-container'>
                            <button
                                className='remove-button'
                                onClick={() =>
                                    handleRemoveFromLibrary(book._id)
                                }
                            >
                                Remove from my library
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MyBooksPage;
