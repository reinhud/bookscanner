import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useReducer, useState } from 'react';

// Define the shape of the state used by the hook
interface State {
    isLoading: boolean;
    isError: boolean;
    response: AxiosResponse<any> | null;
}

// Define the actions that can be dispatched to update the state
type Action =
    | { type: 'FETCH_INIT' }
    | { type: 'FETCH_SUCCESS'; payload: AxiosResponse<any> }
    | { type: 'FETCH_FAILURE' };

// Define the reducer function to update the state based on dispatched actions
const dataFetchReducer = (state: State, action: Action): State => {
    switch (action.type) {
        // Starting fetching process
        case 'FETCH_INIT':
            // Set loading state and clear error state when initiating fetch
            const init_state = {
                ...state,
                isLoading: true,
                isError: false
            };
            // console.log('FETCH_INIT:', init_state);
            return init_state;
            
        // Fetching process succeeded
        case 'FETCH_SUCCESS':
            // Set loading state to false and update response when fetch succeeds
            const success_state = {
                ...state,
                isLoading: false,
                isError: false,
                response: action.payload
            };
            console.log('FETCH_SUCCESS:', success_state);
            return success_state;
        case 'FETCH_FAILURE':
            // Set loading state to false and error state to true when fetch fails
            const failure_state = {
                ...state,
                isLoading: false,
                isError: true
            };
            // console.log('FETCH_FAILURE:', failure_state);
            return failure_state;
        default:
            // Throw an error for unknown action types
            throw new Error();
    }
};


// Custom hook for making API requests using Axios
const useAPI = (
    initialRequest: AxiosRequestConfig<any> | null,
    initialResponse: AxiosResponse<any> | null = null
) => {
    /**
        A custom hook for making API requests using Axios.
        The hook runs an effect to fetch data when the request configuration changes.
    
        @param initialRequest The initial request configuration.
        @param initialResponse The initial response data.
        @returns A tuple containing the response data, loading state, and error state,
                as well as a function to set the request configuration.
     **/

    // Initialize state using the reducer
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        response: initialResponse
    });

    // State to hold the request configuration
    const [requestConfig, setRequestConfig] =
        useState<AxiosRequestConfig<any> | null>(initialRequest);

    // Function to log response errors
    const logResponseErrors = (error: any): void => {
        if (error.response) {
            console.log('Response Errors:');
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log('Request Errors:');
            console.log(error.request);
        } else {
            console.log('General Errors:');
            console.log('Error', error.message);
        }
        console.log(error.config);
    };


    // Effect to fetch data when the request config changes
    useEffect(() => {
        // Flag to track if the component unmounts
        let didCancel = false;

        // Function to fetch data
        const fetchData = async () => {
            // Avoid fetching if requestConfig is null
            if (!requestConfig) return;
            // Dispatch fetch init action to indicate loading state
            dispatch({ type: 'FETCH_INIT' });
            try {
                // Make the API request using Axios
                const response = await axios(requestConfig);
                // Update state with successful response if component is still mounted
                if (!didCancel) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: response });
                }
            } catch (error) {
                // Update state with error if component is still mounted
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE' });
                    logResponseErrors(error);
                }
            }
        };

        // Call fetchData when requestConfig changes
        fetchData();

        // Cleanup function to set didCancel flag when component unmounts
        return () => {
            didCancel = true;
        };
    }, [requestConfig]); // Only refetch if the request config changes

    // Return response data, loading state, error state, and function to set request config
    return [
        {
            response: state.response,
            loading: state.isLoading,
            error: state.isError
        },
        setRequestConfig
    ] as const;
};

export default useAPI;
