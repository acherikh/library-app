import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/LibraryPage.css';

import Drawer from '../components/Drawer';
import Header from '../components/Header';
import BookContainer from '../components/BookContainer';

function LibraryPage() {
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

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

    const BASE_URL = `${URL}/api/library?limit=${itemsPerPage}&page=${currentPage}&sort=name`;
    const COUNT_URL = `${URL}/api/library`;

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
            await fetch(`${URL}/api/library/${id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (err) {
            setNoError(false);
        }
    };

    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.code === 'Escape') {
                setIsDrawerOpen(false);
            }
        }

        document.addEventListener('keydown', handleEscapeKey);
        return () =>
            document.removeEventListener('keydown', handleEscapeKey);
    }, []);

    return (
        <div className='library-page'>
            <Drawer isDrawerOpen={isDrawerOpen} />
            <Header
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                handleDrawer={handleDrawer}
            />
            <div className='books-container'>
                {librarypage.map((book) => (
                    <BookContainer
                        book={book}
                        onAction={handleAddToLibrary}
                        actionText={'Add to my library'}
                        key={book._id}
                    />
                ))}
            </div>
        </div>
    );
}

export default LibraryPage;
