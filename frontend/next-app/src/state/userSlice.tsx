import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../state/store';

/// Define a type for the slice state
interface UserState {
    username: string;
    password: string;
}

// Define the initial state using that type
const initialState: UserState = {
    username: '',
    password: ''
};

// Create a Redux slice for managing user state
export const userSlice = createSlice({
    name: 'user', // Name of the slice
    initialState, // Initial state of the slice
    reducers: {
        // Reducer function for user signup action
        signup: (state, action: PayloadAction<UserState>) => {
            state.username = action.payload.username; // Update username in state with payload data
            state.password = action.payload.password; // Update password in state with payload data
        },
        // Reducer function for user login action
        login: (state, action: PayloadAction<UserState>) => {
            state.username = action.payload.username; // Update username in state with payload data
            state.password = action.payload.password; // Update password in state with payload data
        }
    }
});

export const { signup, login } = userSlice.actions; // Exporting action creators

// Selector function to retrieve user state from the Redux store
export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer; // Exporting the user reducer
