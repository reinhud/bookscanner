'use client';

import useUserLogin from '@/hooks/requests/user/handle_login';
import { UserLoginType } from '@/types/user_type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ActionButton from '../../../components/buttons/signin_button';

// Define the functional component for the login page
export default function LogIn() {
    const [{ isLoggedIn, isLoading, errorMessage }, triggerUserLogin] = useUserLogin();
    const router = useRouter();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<UserLoginType>();
    // State variable to hold the server error message
    const [serverErrorMessage, setServerErrorMessage] = useState<string>('');

    const onSubmit: SubmitHandler<UserLoginType> = async (data) => {
        // Trigger user login attempt with form data
        triggerUserLogin(data);
    };

    const clearAllErrors = () => {
        setError('username', { message: '' });
        setError('password', { message: '' });  
        setServerErrorMessage('');
    };

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/main/home');
        }
    }, [isLoggedIn, router]);

    useEffect(() => {
        // Update local error message with server error message
        if (errorMessage) {
            setServerErrorMessage(errorMessage);
        }
    }, [errorMessage]);

    return (
        <div className="login">
            <div className="login__hero">
                <div className="login__hero__title">Log In</div>
                <div className="login__hero__description">
                    Continue your journey!
                </div>
            </div>
            <form className="login__form" onSubmit={handleSubmit(onSubmit)} onChange={clearAllErrors}>
                <input
                    {...register('username', {
                        required: 'Email is required',
                        minLength: { value: 2, message: 'Username must be at least 2 characters' }
                    })}
                    type="text"
                    placeholder="Username"
                />
                {errors.username && <span>{errors.username.message}</span>}
                <input
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 4, message: 'Password must be at least 4 characters' }
                    })}
                    type="password"
                    placeholder="Password"
                />
                {errors.password && <span>{errors.password.message}</span>}
                {serverErrorMessage && <span>{serverErrorMessage}</span>}
                <div className="login__form__buttons">
                    <ActionButton text="Log In" type="submit" onClick={handleSubmit(onSubmit)} />
                    <Link href="/signin/signup">Don&apos;t have an account yet?</Link>
                </div>
            </form>
        </div>
    );
}