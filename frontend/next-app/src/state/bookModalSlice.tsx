import BookType from '@/types/book_type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the modal slice state
interface BookModalState {
    isVisible: boolean;
    book: BookType;
}

// Define the initial state for the modal
const initialState: BookModalState = {
    isVisible: false,
    book: {
        title: '',
        authors: [''],
        isbn13: '',
        isbn10: '', 
        published_date: '',
        page_count: 0,
        description: '',
        categories: [''],
        average_rating: 0,
        image_url: '',
        source: '',
    }
};

// Create a Redux slice for managing the modal state
export const bookModalSlice = createSlice({
    name: 'bookModal', // Name of the slice
    initialState, // Initial state of the slice
    reducers: {
        // Reducer function to open or close the modal
        closeModal: (state) => {
            console.log('Closing modal');
            state.isVisible = false; // Close the modal
            state.book = initialState.book; // Reset the book data
        },
        // Reducer function to open the modal
        openModal: (state) => {
            console.log('Opening modal');
            state.isVisible = true; // Open the modal
        },
        // Reducer function to update the book data in the modal
        setBook: (state, action: PayloadAction<BookType>) => {
            console.log('Setting book for modal', action.payload);
            state.book = action.payload; // Update the book data in the modal
        }
    }
});

export const { closeModal, openModal, setBook } = bookModalSlice.actions; // Exporting action creators

// Selector function to retrieve modal state from the Redux store
export const selectBookModal = (state: RootState) => state.bookModal;

export const bookModalReducer = bookModalSlice.reducer; // Exporting the modal reducer
