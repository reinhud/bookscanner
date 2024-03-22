"use client";

import PageHeader from "@/components/header/page_header";
import useAPI from "@/hooks/requests/api";
import UserRequest from "@/requests/user_requests";
import { UserType } from "@/types/user_type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserProfilePic from "../../../../public/images/user_profile_pic.jpg";

const userRequest = new UserRequest();

export default function Account() {
  /**
        Component for rendering the Account page.
        This page allows users to update their account information.
     */
  const [{ response, isLoading, isError, errorMessage }, setRequestConfig] =
    useAPI(null, null);
  const [userData, setUserData] = useState<UserType | null>(null); // State to store user data
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");

  const router = useRouter(); // Initialize the useRouter hook

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

  // Function to handle logout request
  const handleLogout = () => {
    setRequestConfig(userRequest.logout()); // Set request configuration to logout
    // Redirect to the signup/intro page upon successful logout
    router.push("/signin/intro");
  };

  return (
    <main>
      {/* Display the page header */}
      <PageHeader title="Account" />

      {/* Display user information */}
      <div className="account-page">
        <div className="account-page__user-info">
          {/* Display user profile picture */}
          <div className="account-page__user-info__pic">
            <Image
              src={UserProfilePic}
              alt="User Profile Picture"
              objectFit="fill"
              objectPosition="50% 50%"
              fill={true}
            />
          </div>
          {/* Display username */}
          <h2>{userData ? userData.username : "Loading..."}</h2>
          {/* Display server error message if any */}
          {serverErrorMessage && (
            <p className="error-message">{serverErrorMessage}</p>
          )}
        </div>
        {/* Button to log out */}
        <button className="account-page__logout-button" onClick={handleLogout}>
          Log Out
        </button>
        {/* Display general info about the app */}
        <div className="account-page__app-info">
          <h2>Info:</h2>
          <p>
            This is our project app for the course &quot;System and Software
            Engineering&quot;. Thank you for using our app, we hope you enjoy
            it! Please feel free to contact us if you have any questions or
            feedback.
          </p>
        </div>
      </div>
    </main>
  );
}
