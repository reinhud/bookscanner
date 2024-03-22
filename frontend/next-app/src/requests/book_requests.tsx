import { AxiosRequestConfig } from "axios";

export default class BookRequest {
  /**
   * Initialize BookRequest class with methods for book-related requests.
   */

  // Backend URL for user-related requests
  NEXT_PUBLIC_BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND_IP}:${process.env.NEXT_PUBLIC_BACKEND_HOST_PORT}`;

  // Method to construct search by ISBN or Name request
  search_name = (search_term: string): AxiosRequestConfig => {
    // Construct the request object
    const request = {
      method: "get",
      url: `${this.NEXT_PUBLIC_BACKEND_URL}/search/name?query=${search_term}`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      },
    };
    // Log the constructed request
    console.log("Created ISBN Search Request:", request);
    // Return the request object
    return request;
  };

  // Method to construct search by image request
  search_image = (image: string): AxiosRequestConfig => {
    // Construct the request object
    const request = {
      method: "post",
      url: `${this.NEXT_PUBLIC_BACKEND_URL}/search_image`,
      body: {
        data: image,
      },
    };
    // Log the constructed request
    console.log("Created Image Search Request:", request);
    // Return the request object
    return request;
  };
}
