import UserRequest from "@/requests/user_requests";
import { useEffect, useState } from "react";
import useAPI from "../api";

const userRequest = new UserRequest();

export default function useUserAuthentification() {
  const [{ response, isLoading, isError, errorMessage }, setRequestConfig] =
    useAPI(null, null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Set request configuration to check user login status
    setRequestConfig(userRequest.me());
  }, [setRequestConfig]);

  useEffect(() => {
    if (response && !isLoading) {
      if (!isError && response.status === 200) {
        setIsLoggedIn(true); // Set login status to true
      }
    }
  }, [response, isLoading, isError]);

  return [{ isLoggedIn, isLoading, errorMessage }] as const;
}
