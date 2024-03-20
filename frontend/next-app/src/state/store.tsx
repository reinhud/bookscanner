import { configureStore } from '@reduxjs/toolkit';
import { bookModalReducer } from './bookModalSlice';
import { userReducer } from './userSlice';

// Create and configure the Redux store
export const store = configureStore({
    reducer: {
        user: userReducer, // Assigning the user reducer to the 'user' slice of the store
        bookModal: bookModalReducer // Assigning the modal reducer to the 'modal' slice of the store
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>; // Type definition for the RootState based on the store's state
export type AppDispatch = typeof store.dispatch; // Type definition for the AppDispatch based on the store's dispatch function
