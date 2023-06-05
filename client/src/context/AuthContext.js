import { createContext, useCallback, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/services";
import { useNavigate} from 'react-router'

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate=useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")) || null);
  const [registerError, setRegisterError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);



  const registerUser = useCallback(async (data) => {
    setIsLoading(true);
    setRegisterError(null);
    try {
      const response = await axios.post(
        `${baseUrl}/auth/register-user`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      let userInfo = response.data;
      localStorage.setItem("User", JSON.stringify(
        {
          userName: userInfo.userName,
          id: userInfo._id,
          token: userInfo.token,
          email: userInfo.email,
        }
      ));
      setIsLoading(false);
      setUser(userInfo);
      navigate("/")
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.message);
      setRegisterError(error.response.data.message);
    }
  });

  // LOGIN API
 

  const loginUser = useCallback(async (data) => {
    setIsLoading(true);
    setLoginError(null);
    try {
      const response = await axios.post(
        `${baseUrl}/auth/login-user`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      let userInfo = response.data;
      localStorage.setItem("User", JSON.stringify(
        {
          userName: userInfo.userName,
          id: userInfo._id,
          token: userInfo.token,
          email: userInfo.email,
        }
      ));
      setUser(userInfo);
      setIsLoading(false);
      navigate("/")
      console.log(userInfo);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.message);
      setLoginError(error.response.data.message);
    }
  });

  // LOGOUT USER

  const logoutUser = useCallback(async (e) => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        registerError,
        isLoading,
        loginError,
        logoutUser,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
