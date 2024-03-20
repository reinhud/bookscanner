'use client';

import BookCard from '@/components/cards/book_card';
import PageHeader from '@/components/header/page_header';
import useAPI from '@/hooks/requests/api';
import BookRequest from '@/requests/book_requests';
import BookType from '@/types/book_type';
import { useEffect } from 'react';

// Create an instance of BookRequest class
const bookRequest = new BookRequest();

export default function Bookmarks() {
    /**
        Component for rendering the Bookmarks page.
        This page displays all the bookmarked books.
    */
    // State variables for API response, loading state, and error
    const [{ response, loading, error }, setRequestConfig] = useAPI(null, null);

    // Set request configuration to get all books when component mounts
    useEffect(() => {
        // Set request configuration to get all bookmarked books
        setRequestConfig(bookRequest.bookmarks());

        // Cleanup function to prevent memory leaks
        return () => {};
    }, [setRequestConfig]); // Empty dependency array ensures the effect runs only once

    return (
        <main>
            {/* Display the page header */}
            <PageHeader title="Bookmarks" />

            <div className="bookmarks-page">
                {/* Display loading message if data is loading */}
                {loading && <p>Loading...</p>}

                {/* Display error message if an error occurred */}
                {error && <p>Error occurred.</p>}

                {/* Display bookmarked books */}
                {response &&
                    response.data &&
                    response.data.map((book: BookType, index: any) => (
                        <BookCard key={index} book={book} />
                    ))}
            </div>
        </main>
    );
}
