'use client';

import { useAppDispatch } from '@/hooks/state';
import BookType from '@/types/book_type';
import { useEffect, useState } from 'react';
import BookRequest from '../../../requests/book_requests';
import useAPI from '../api';

// Define the requests for books
const bookRequest = new BookRequest();

const useTextSearch = () => {
    // State variables for API response, loading state, form data, and search status
    const [{ response, isLoading, isError }, setRequestConfig] = useAPI(null, null);
    const [searchTerm, triggerTextSearch] = useState<string>(''); // Renamed from `isbn` to `searchTerm`

    const [book, setBook] = useState<BookType | null>(null);

    // Redux dispatch function
    const dispatch = useAppDispatch();

    // Effect hook to handle book search process
    useEffect(() => {
        // Function to search book
        const searchBook = () => {
            // Check if search term is empty
            if (!searchTerm) return;

            // Set request configuration for book search API call
            setRequestConfig(bookRequest.search_name(searchTerm)); // Adjusted to handle both ISBN and book name

            // Check if response is not null and isLoading has stopped
            if (response && !isLoading) {
                // Check if search was successful
                if (!isError && response.status === 200) {
                    // Dispatch action to add book to Redux store
                    console.log('Adding book to store:', response.data);
                    setBook(response.data);
                    //#TODO: implement: dispatch(addBook(response.data));
                    // Return the book data
                } else {
                    setBook(null); // Reset book state if search fails
                }
            }
        };

        // Call searchBook function
        searchBook();
    }, [response, isLoading, isError, setRequestConfig, searchTerm, dispatch]);

    // Return book search status and isLoading state along with function to trigger book search
    return [{ book, isLoading }, triggerTextSearch] as const;
};

// Export the custom hook for text-based book search
export default useTextSearch;
