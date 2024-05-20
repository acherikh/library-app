import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/MyBooksPage.css';

import Drawer from '../components/Drawer';
import Header from '../components/Header';
import BookContainer from '../components/BookContainer';

const MyBooksPage = () => {
    const navigate = useNavigate();

    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
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
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((currentPage) => currentPage + 1);
        }
    };

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    useEffect(() => {
        document.body.style.overflow = isDrawerOpen
            ? 'hidden'
            : 'unset';

        const booksContainer = document.querySelector(
            '.books-container'
        );
        booksContainer.style.filter = isDrawerOpen
            ? 'brightness(80%)'
            : 'brightness(100%)';

        booksContainer.style.pointerEvents = isDrawerOpen
            ? 'none'
            : '';
    }, [isDrawerOpen]);

    let URL;
    if (`${import.meta.env.VITE_NODE_ENV}` === 'development') {
        URL = `${import.meta.env.VITE_PRODUCTION_API_URL}`;
    } else {
        URL = `${import.meta.env.VITE_LOCAL_API_URL}`;
    }

    const BASE_URL = `${URL}/api/user/myBooks?limit=${itemsPerPage}&page=${currentPage}&sort=name`;

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

    const handleRemoveFromLibrary = async (id) => {
        try {
            await fetch(`${URL}/api/library/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            fetchMyBooks();
        } catch (err) {
            setNoError(false);
        }
    };

    return (
        <div className='my-books-page'>
            <Drawer isDrawerOpen={isDrawerOpen} />
            <Header
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                handleDrawer={handleDrawer}
            />
            <div className='books-container'>
                {myBooks.map((book) => (
                    <BookContainer
                        book={book}
                        onAction={handleRemoveFromLibrary}
                        actionText={'Remove from my library'}
                        key={book._id}
                    />
                ))}
            </div>
        </div>
    );
};
export default MyBooksPage;
