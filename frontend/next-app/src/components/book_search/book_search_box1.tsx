'use client';

import useAPI from '@/hooks/requests/api';
import { useAppDispatch } from '@/hooks/state';
import BookRequest from '@/requests/book_requests';
import { openModal, setBook } from '@/state/bookModalSlice';
import BookType from '@/types/book_type';
import { SetStateAction, useEffect, useState } from 'react';
import ImageDropzone from './image_dropzone';

// Create an instance of the BookRequest class
const bookRequest = new BookRequest();

export default function BookSearchBox() {
    const [{ response, loading }, setRequestConfig] = useAPI(null, null);
    const [searchText, setSearchText] = useState(''); // State to store the text input value
    // Redux dispatch function
    const dispatch = useAppDispatch();

    // Function to handle book search API request
    const searchBook = () => {
        // Set request configuration for book search API call
        setRequestConfig(bookRequest.search_name(searchText));
    };

    useEffect(() => {
        // Trigger the book search API request when the component mounts
        searchBook();
    }, []);

    useEffect(() => {
        // Check if response is successful and not loading
        if (!loading && response && response.status === 200) {
            // Grab the first books from the search results
            const book: BookType = response!.data.searchResults[0];
            if (!book) return; // Return if no book is found
            // Update global modal state with the book data from the response
            dispatch(setBook(book));
            // Open the modal
            dispatch(openModal());
        }
    }, [response, loading, dispatch]);

    // Handler for text input change
    const handleInputChange = (e: {
        target: { value: SetStateAction<string> };
    }) => {
        setSearchText(e.target.value);
    };

    // Handler for pressing the Enter key
    const handleKeyPress = (e: { key: string }) => {
        if (e.key === 'Enter') {
            searchBook(); // Call searchBook function on pressing Enter
        }
    };

    return (
        <div className="book-search-box">
            <div className="book-search-box__file">
                <ImageDropzone />
            </div>
            <div className="book-search-box__manual">
                <h2 className="book-search-box__manual__header">
                    Or search manually:
                </h2>
                <input
                    type="text"
                    placeholder="Enter ISBN or title"
                    className="book-search-box__manual__input"
                    onKeyDown={handleKeyPress}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}
