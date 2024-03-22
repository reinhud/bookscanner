"use client";

import BookSearchBox from "@/components/book_search/book_search_box";
import useAPI from "@/hooks/requests/api";
import UserRequest from "@/requests/user_requests";
import { UserType } from "@/types/user_type";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserProfilePic from "../../../../../public/images/user_profile_pic.jpg";

const userRequest = new UserRequest();

export default function HeroSection() {
  /**
        Component for rendering the hero section of the home page.
        This section contains the user profile picture and the book search box.
    */
  const [{ response, isLoading, isError, errorMessage }, setRequestConfig] =
    useAPI(null, null);
  const [userData, setUserData] = useState<UserType | null>(null); // State to store user data
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");

  useEffect(() => {
    setServerErrorMessage(""); // Clear any previous server error message
    // Set request configuration to get user information
    setRequestConfig(userRequest.me());
  }, [setRequestConfig]);

  // Update user data when response is successful
  useEffect(() => {
    if (response && !isLoading) {
      if (!isError && response.status === 200) {
        setUserData(response.data as UserType); // Set user data from response
      } else {
        setServerErrorMessage(errorMessage); // Set server error message
      }
    }
  }, [response, isLoading, isError, errorMessage]);

  return (
    <div className="hero-section">
      {/* Display user profile picture and welcome message */}
      <div className="hero-section__welcome">
        <div className="hero-section__welcome__image">
          {/* Display user profile picture */}
          <Image
            src={UserProfilePic}
            alt="User Profile Picture"
            objectFit="fill"
            objectPosition="50% 50%"
            fill={true}
          />
        </div>
        <div className="hero-section__welcome__text">
          {/* Display welcome message */}
          <h1 className="hero-section__welcome__text__greeting">
            Welcome back,
          </h1>
          {/* Display username */}
          <h1 className="hero-section__welcome__text__username">
            {userData && userData.username}
          </h1>
          {/* Display server error message if any */}
          {serverErrorMessage && (
            <p className="error-message">{serverErrorMessage}</p>
          )}
        </div>
      </div>
      {/* Display the book search box */}
      <h1 className="hero-section__search-box">
        <BookSearchBox />
      </h1>
    </div>
  );
}
