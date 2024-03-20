'use client';


import useUserSignUp from '@/hooks/requests/user/handle_signup';
import { UserSignUpType } from '@/types/user_type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ActionButton from '../../../components/buttons/signin_button';

export default function SignUp() {
    const [{ isLoggedIn, isLoading, errorMessage }, triggerUserSignUp] = useUserSignUp();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<UserSignUpType>();
    const [serverErrorMessage, setServerErrorMessage] = useState<string>('');

    const onSubmit: SubmitHandler<UserSignUpType> = async (data) => {
        // Trigger user sign-up attempt with form data
        triggerUserSignUp(data);
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
        if (errorMessage) {
            setServerErrorMessage(errorMessage);
        }
    }, [errorMessage]);

    return (
        <div className="signup">
            <div className="signup__hero">
                <div className="signup__hero__title">Sign Up</div>
                <div className="signup__hero__description">
                    Start exploring the world of books!
                </div>
            </div>
            <form className="signup__form" onSubmit={handleSubmit(onSubmit)} onChange={clearAllErrors}>
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
                <div className="signup__form__buttons">
                    <ActionButton text="Sign Up" type="submit" onClick={handleSubmit(onSubmit)} />
                    <Link href="/signin/login">Already have an account?</Link>
                </div>
            </form>
        </div>
    );
}