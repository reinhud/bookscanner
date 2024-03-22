import useAPI from "@/hooks/requests/api";
import { useAppDispatch } from "@/hooks/state";
import { login } from "@/state/userSlice";
import { UserLoginType } from "@/types/user_type";
import { useEffect, useState } from "react";
import UserRequest from "../../../requests/user_requests";

const userRequest = new UserRequest();

const useUserLogin = () => {
  const [{ response, isLoading, isError, errorMessage }, setRequestConfig] =
    useAPI(null, null);
  const [formUser, triggerUserLogin] = useState<UserLoginType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loginUser = () => {
      if (!formUser) return;
      // Set request configuration for login API call
      setRequestConfig(userRequest.login(formUser));
    };

    // Call loginUser function only when formUser changes
    loginUser();
  }, [formUser, setRequestConfig]); // Only re-run the effect if formUser changes

  // Effect hook to handle API response
  useEffect(() => {
    if (response && !isLoading) {
      if (!isError && response.status === 200) {
        // Dispatch user login action to update Redux store
        dispatch(login(formUser!));
        setIsLoggedIn(true); // Set login status to true
      }
    }
  }, [response, isLoading, isError, formUser, dispatch]); // Only re-run the effect if response, loading, or error change

  return [{ isLoggedIn, isLoading, errorMessage }, triggerUserLogin] as const;
};

export default useUserLogin;
