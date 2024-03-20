'use client';

import BookCard from '@/components/cards/book_card';
import useAPI from '@/hooks/requests/api';
import UserRequest from '@/requests/user_requests';
import BookType from '@/types/book_type';
import { useEffect, useState } from 'react';

const userRequest = new UserRequest();

export default function HistorySection() {
    /**
        Component for rendering the history section of the home page.
        This section contains the user's recently scanned books and bookmarks.
    */
    const [{ response, isLoading, isError, errorMessage }, setRequestConfig] = useAPI(null, null);
    const [serverErrorMessage, setServerErrorMessage] = useState<string>('');

    useEffect(() => {
        setServerErrorMessage(''); // Clear any previous server error message
        // Set request configuration to get search history books
        setRequestConfig(userRequest.history());
    }, [setRequestConfig]); 

    useEffect(() => {
        if (errorMessage) {
            setServerErrorMessage(errorMessage);
        }
    }, [errorMessage]);

    return (
        <div className="history_section">
            {/* Display loading message while data is being fetched */}
            {isLoading && <p>Loading...</p>}
                {/* Display error message if an error occurred during API request */}
                {isError && <p>{serverErrorMessage || 'Error occurred.'}</p>}
                {/* Map through the response data and display book cards */}
                {/*  {response &&
                    response.data &&
                    <div>{JSON.stringify(response.data)}</div>} */}
                {response &&
                    response.data &&
                    response.data.map((book: BookType, index: any) => (
                        <BookCard key={index} book={book} />
                    ))}
        </div>
    );
}
