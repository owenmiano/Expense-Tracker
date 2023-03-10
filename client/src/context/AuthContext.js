import { createContext,useCallback,useEffect,useState } from "react";
import axios from 'axios'
import { baseUrl } from "../utils/services";

export const AuthContext =createContext();

export const AuthContextProvider =({children})=>{
   const [user,setUser]=useState(null);
   const [registerError,setRegisterError]=useState(null);
   const [isLoading,setIsLoading]=useState(false);
   const[registerInfo,setRegisterInfo]=useState({
    userName:"",
    email:"",
    password:"",
   })

   const[loginInfo,setLoginInfo]=useState({
     email:"",
    password:"",
   })
   const [loginError,setLoginError]=useState(null);


  useEffect(()=>{
    const user=localStorage.getItem("User");
    setUser(JSON.parse(user));
  },[])

   const updateRegisterInfo=useCallback((info)=>{
    setRegisterInfo(info)
   },[]);

      const registerUser=useCallback(async(e)=>{
        e.preventDefault()
        setIsLoading(true);
        setRegisterError(null)
        try {
         const response=await axios.post(`${baseUrl}/auth/register-user`,
           JSON.stringify(registerInfo),
           {
             headers: {
             'Content-Type': "application/json",
             'Accept': "application/json",
             }  
         }   
       )
      let userInfo=response.data;
       localStorage.setItem('User',JSON.stringify(userInfo))
       setIsLoading(false);
       setUser(userInfo)
       
        } catch (error) {
          setIsLoading(false);
         console.log(error.response.data.message)
         setRegisterError(error.response.data.message)
     }
      })

// LOGIN API
      const updateLoginInfo=useCallback((info)=>{
        setLoginInfo(info)
       },[]);

       const loginUser=useCallback(async(e)=>{
        e.preventDefault()
        setIsLoading(true);
        setLoginError(null)
        try {
          const response=await axios.post(`${baseUrl}/auth/login-user`,
            JSON.stringify(loginInfo),
            {
              headers: {
              'Content-Type': "application/json",
              'Accept': "application/json",
              }  
          }   
        )
       let userInfo=response.data;
        localStorage.setItem('User',JSON.stringify(userInfo))
        setUser(userInfo)
        setIsLoading(false);
        console.log(userInfo)
         } catch (error) {
           setIsLoading(false);
          console.log(error.response.data.message)
          setLoginError(error.response.data.message)
      }

       })

// LOGOUT USER

      const logoutUser=useCallback(async(e)=>{
          localStorage.removeItem("User")
          setUser(null);
      },[])

    return(
         <AuthContext.Provider value={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isLoading,
            updateLoginInfo,
            loginError,
            logoutUser,
            loginInfo,
            loginUser
         }}>
           {children}
         </AuthContext.Provider>
    )
}