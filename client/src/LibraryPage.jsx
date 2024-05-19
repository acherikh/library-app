import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './LibraryPage.css';
import bookPlaceholder from '../img/book-cover-placeholder.png';
import profilePicture from '../img/profile_pic.jpg';

function LibraryPage() {
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const BASE_URL = `https://library-app-api-prod.onrender.com/api/library?limit=${itemsPerPage}&page=${currentPage}&sort=name`;
    const COUNT_URL =
        'https://library-app-api-prod.onrender.com/api/library';

    let [librarypage, setLibrarypage] = useState([]);
    const [fetchingBooks, setFetchingBooks] = useState(true);
    const [noError, setNoError] = useState(true);

    useEffect(() => {
        const fetchLibraryCount = async () => {
            try {
                const response = await fetch(COUNT_URL, {
                    method: 'GET',
                    credentials: 'include', // <- this is mandatory to deal with cookies
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response) {
                    const data = await response.json();
                    setTotalCount(data.results);
                }
            } catch (err) {
                setNoError(false);
            }
        };

        fetchLibraryCount();
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
                    setLibrarypage(data.data.instances);
                }

                setFetchingBooks(false);
            } catch (err) {
                setNoError(false);
            }
        };
        fetchLibrarypage();
    }, [currentPage, itemsPerPage]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

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

    const handleAddToLibrary = async (id) => {
        try {
            await fetch(
                `https://library-app-api-prod.onrender.com/api/library/${id}`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (err) {
            setNoError(false);
        }
    };

    return (
        <div className='library-page'>
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
                {librarypage.map((book) => (
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

                        <button
                            onClick={() =>
                                handleAddToLibrary(book._id)
                            }
                        >
                            Add to my library
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LibraryPage;
