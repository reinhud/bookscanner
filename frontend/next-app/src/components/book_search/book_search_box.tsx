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
    const [{ response, isLoading, isError, errorMessage }, setRequestConfig] = useAPI(null, null);
    const [searchText, setSearchText] = useState(''); // State to store the text input value
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false); // State to control error modal visibility
    const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false); // State to control loading modal visibility

    // Redux dispatch function
    const dispatch = useAppDispatch();

    // Function to handle book search API request
    const searchBook = () => {
        if (!searchText) return; // Don't search if the search text is empty
        // Set request configuration for book search API call
        setRequestConfig(bookRequest.search_name(searchText));
        setIsLoadingModalVisible(true); // Show loading modal
        // Clear the search text state
        setSearchText('');
    };

    useEffect(() => {
        // Trigger the book search API request when the component mounts
        searchBook();
    }, []);

    useEffect(() => {
        // Check if response is successful and not loading
        if (!isError && response && response.data) {
                const book: BookType = response.data[0];
                // Update global modal state with the book data from the response
                dispatch(setBook(book));
                // Open the modal
                dispatch(openModal());
        } else if (isError) {
            // Show error modal
            setIsErrorModalVisible(true);
        }
        // Close loading modal regardless of the response status
        setIsLoadingModalVisible(false);
    }, [response, dispatch, isError]);


    useEffect(() => {
        // Update loading modal visibility based on the isLoading state
        if (isLoading) {
            setIsLoadingModalVisible(true);
        } else {
            setIsLoadingModalVisible(false);
        }
    }, [isLoading]);

    // Handler for text input change
    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchText(e.target.value);
    };

    // Handler for pressing the Enter key
    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            searchBook(); // Call searchBook function on pressing Enter
        }
    };

    // Handler for closing the error modal
    const handleCloseErrorModal = (event: React.MouseEvent<any>) => {
        event.stopPropagation(); // Stop event propagation to prevent closing the modal when clicking inside the modal content
        setIsErrorModalVisible(false);
    };

    // Effect to add or remove the active-modal class from the body element for scrolling
    useEffect(() => {
        if (isErrorModalVisible || isLoadingModalVisible) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }
    }, [isErrorModalVisible, isLoadingModalVisible]);


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
            {/* Loading modal */}
            {isLoadingModalVisible && (
                <div className="modal">
                    <div className="modal-overlay"></div>
                    <div className="search-modal">
                        <p>Loading...</p>  
                    </div>
                </div>
            )}
            {/* Error modal */}
            {isErrorModalVisible && (
                <div className="modal">
                    <div className="modal-overlay" onClick={handleCloseErrorModal}></div>
                    <div className="search-modal error" >
                        <p>{errorMessage}</p>     
                    </div>
                </div>
            )}
        </div>
    );
}

