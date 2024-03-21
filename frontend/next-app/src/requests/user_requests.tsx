import { UserSignUpType } from '@/types/user_type';
import { AxiosRequestConfig } from 'axios';

// Class for handling user-related requests
export default class UserRequest {
    /**
     * Initialize UserRequest class with methods for user-related requests.
     */

    // Backend URL for user-related requests
    //NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    NEXT_PUBLIC_BACKEND_URL = 'http://172.104.241.247/:8000'  //`${process.env.BACKEND_IP}:${process.env.BACKEND_HOST_PORT}`;

    // Method to construct sign-up request
    signup = (user: UserSignUpType): AxiosRequestConfig => {
        const form_data = new FormData()
        form_data.append("username", user.username)
        form_data.append("password", user.password)

        // Construct the request object
        const request = {
            method: 'post',
            url: `${this.NEXT_PUBLIC_BACKEND_URL}/register`,
            data: form_data, // Use 'data' instead of 'body' for Axios
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'multipart/form-data'
            },
        };
        // Log the constructed request
        console.log('Created User Sign-up Request:', request);
        // Return the request object
        return request;
    };

    // Method to construct login request
    login = (user: UserSignUpType): AxiosRequestConfig => {
        const form_data = new FormData()

        form_data.append("username", user.username)
        form_data.append("password", user.password)

        // Construct the request object
        const request = {
            method: 'post',
            url: `${this.NEXT_PUBLIC_BACKEND_URL}/login`,
            data: form_data, // Use 'data' instead of 'body' for Axios
            withCredentials: true,
            headers: {
                //'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'multipart/form-data'
            },
        };
        // Log the constructed request
        console.log('Created User Login Request:', request);
        // Return the request object
        return request;
    };

    // Method to log out the currrent user
    logout = (): AxiosRequestConfig => {
        // Construct the request object
        const request = {
            method: 'post',
            url: `${this.NEXT_PUBLIC_BACKEND_URL}/logout`,
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'multipart/form-data'
            }
            

        };
        // Log the constructed request
        console.log('Created User Logout Request:', request);
        // Return the request object
        return request;
    };

    // Method to get user data
    me = (): AxiosRequestConfig => {
        // Construct the request object
        const request = {
            method: 'get',
            url: `${this.NEXT_PUBLIC_BACKEND_URL}/users/me`,
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'multipart/form-data'
            }
            

        };
        // Log the constructed request
        console.log('Created Current User Request:', request);
        // Return the request object
        return request;
    };

    // Method to get the search history of user
    history = (): AxiosRequestConfig => {
        // Construct the request object
        const request = {
            method: 'get',
            url: `${this.NEXT_PUBLIC_BACKEND_URL}/users/history`,
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'multipart/form-data'
            }
        };
        // Log the constructed request
        console.log('Created Search History Request:', request);
        // Return the request object
        return request;
    };

    // Method to get the reccomented books
    recommendations = (): AxiosRequestConfig => {
        // Construct the request object
        const request = {
            method: 'get',
            url: `${this.NEXT_PUBLIC_BACKEND_URL}/users/recommendations`,
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'multipart/form-data'
            }
        };
        // Log the constructed request
        console.log('Created Recommended Books Request:', request);
        // Return the request object
        return request;
    };

    // Method to get the bookmarked books
    bookmarks = (): AxiosRequestConfig => {
        // Construct the request object
        const request = {
            method: 'get',
            url: `${this.NEXT_PUBLIC_BACKEND_URL}/bookmarks`,
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'multipart/form-data'
            }
        };
        // Log the constructed request
        console.log('Created Bookmarks Request:', request);
        // Return the request object
        return request;
    };
}
