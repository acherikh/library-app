import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './MyBooksPage.css';

import bookPlaceholder from '../img/book-cover-placeholder.png';
import profilePicture from '../img/profile_pic.jpg';

const MyBooksPage = () => {
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const BASE_URL = `https://library-app-api-fxmy.onrender.com/api/user/myBooks?limit=${itemsPerPage}&page=${currentPage}&sort=name`;

    const [myBooks, setMyBooks] = useState([]);
    const [fetchingMyBooks, setFetchingMyBooks] = useState(true);
    const [noError, setNoError] = useState(true);

    useEffect(() => {
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
        fetchMyBooks();
    }, []);

    useEffect(() => {
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
        fetchLibrarypage();
    }, [currentPage, itemsPerPage]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    console.log(totalPages, itemsPerPage, totalCount, currentPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((currentPage) => currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((currentPage) => currentPage + 1);
        }
    };

    return (
        <div className='my-books-page'>
            <header>
                <div>
                    <img src={bookPlaceholder} />
                </div>
                <div>
                    <button onClick={handlePreviousPage}>
                        Previous Page
                    </button>
                </div>
                <div>
                    <button onClick={handleNextPage}>
                        Next Page
                    </button>
                </div>
                <div>
                    <Link to='/user/my-books'>
                        <img src={profilePicture} />
                    </Link>
                </div>
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
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MyBooksPage;
