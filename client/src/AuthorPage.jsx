import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AuthorPage() {
    const params = useParams();

    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(1);

    const BASE_URL = `http://localhost:3000/api/library?slugAuthor=${params.authorName}&limit=${itemsPerPage}&page=${currentPage}`;
    const COUNT_URL = `http://localhost:3000/api/library?slugAuthor=${params.authorName}`;

    let [authorpage, setAuthorpage] = useState([]);
    const [fetchingAuthor, setAuthor] = useState(true);
    const [noError, setNoError] = useState(true);

    useEffect(() => {
        const fetchAuthorCount = async () => {
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
        fetchAuthorCount();
    }, []);

    useEffect(() => {
        const fetchBookPage = async () => {
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
                    setAuthorpage(data.data.instances);
                }

                setFetchingBook(false);
            } catch (err) {
                setNoError(false);
            }
        };
        fetchBookPage();
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

    return (
        <div className='overview-page'>
            <h1>Books from {params.authorName}</h1>
            <ul>
                {authorpage.map((book) => (
                    <li key={book._id}>
                        <strong>{book.name}</strong> by {book.author}
                        <br />
                        Genre: {book.genre}
                        <br />
                        Year: {book.year}
                        <br />
                        Pages: {book.pages}
                    </li>
                ))}
            </ul>

            <div className='pagination'>
                <button onClick={handlePreviousPage}>
                    Previous Page
                </button>
                <button onClick={handleNextPage}>Next Page</button>
            </div>
        </div>
    );
}

export default AuthorPage;
