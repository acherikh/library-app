import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BookPage() {
    const params = useParams();

    let URL;
    if (`${import.meta.env.VITE_NODE_ENV}` === 'development') {
        URL = `${import.meta.env.VITE_PRODUCTION_API_URL}`;
    } else {
        URL = `${import.meta.env.VITE_LOCAL_API_URL}`;
    }

    const BASE_URL = `${URL}/api/library?slugAuthor=${params.authorName}&limit=${itemsPerPage}&page=${currentPage}`;

    let [bookpage, setBookpage] = useState([]);
    const [fetchingBook, setFetchingBook] = useState(true);
    const [noError, setNoError] = useState(true);

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
                    setBookpage(data.data.instances);
                }

                setFetchingBook(false);
            } catch (err) {
                setNoError(false);
            }
        };
        fetchBookPage();
    }, []);

    return (
        <div className='overview-page'>
            <h1>Book</h1>
            <ul>
                {bookpage.map((book) => (
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
        </div>
    );
}

export default BookPage;
