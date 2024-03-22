import useAPI from '@/hooks/requests/api';
import { useAppDispatch } from '@/hooks/state';
import { signup } from '@/state/userSlice';
import { UserSignUpType } from '@/types/user_type';
import { useEffect, useState } from 'react';
import UserRequest from '../../../requests/user_requests';

const userRequest = new UserRequest();

const useUserSignUp = () => {
    const [{ response, isLoading, isError, errorMessage }, setRequestConfig] = useAPI(null, null);
    const [formUser, triggerUserSignUp] = useState<UserSignUpType | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const signUpUser = () => {
            if (!formUser) return;
            // Set request configuration for signUp API call
            setRequestConfig(userRequest.signup(formUser));
        };

        // Call signUpUser function only when formUser changes
        signUpUser();
    }, [formUser, setRequestConfig]); // Only re-run the effect if formUser changes

    // Effect hook to handle API response
    useEffect(() => {
        if (response && !isLoading) {
            if (!isError && response.status === 201) {
                // Dispatch user login action to update Redux store
                dispatch(signup(formUser!));
                setIsLoggedIn(true); // Set login status to true
            }
        }
    }, [response, isLoading, isError, formUser, dispatch]); // Only re-run the effect if response, loading, or error change

    return [{ isLoggedIn, isLoading, errorMessage }, triggerUserSignUp] as const;
};

export default useUserSignUp;