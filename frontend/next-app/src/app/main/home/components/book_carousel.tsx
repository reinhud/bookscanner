"use client";

import BookCard from "@/components/cards/book_card";
import useAPI from "@/hooks/requests/api";
import UserRequest from "@/requests/user_requests";
import BookType from "@/types/book_type";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const userRequest = new UserRequest();

export default function BookCarousel() {
  /**
        Component for rendering a carousel of book cards.
        This component is used to display a carousel of books on the home page.
    */
  // Define responsive configurations for the carousel
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  const [{ response, isLoading, isError, errorMessage }, setRequestConfig] =
    useAPI(null, null);
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");

  useEffect(() => {
    setServerErrorMessage(""); // Clear any previous server error message
    // Set request configuration to get search history books
    setRequestConfig(userRequest.recommendations());
  }, [setRequestConfig]);

  useEffect(() => {
    if (errorMessage) {
      setServerErrorMessage(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div className="carousel-container">
      {/* Display loading message while data is being fetched */}
      {isLoading && <p>Loading...</p>}
      {/* Display error message if an error occurred during API request */}
      {isError && <p>{serverErrorMessage || "Error occurred."}</p>}
      {/* Display carousel if data is available */}
      {response && response.data && (
        <Carousel responsive={responsive}>
          {response.data.map((book: BookType, index: any) => (
            <BookCard key={index} book={book} />
          ))}
        </Carousel>
      )}
    </div>
  );
}
