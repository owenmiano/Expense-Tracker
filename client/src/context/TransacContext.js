import { createContext,useCallback,useEffect,useState } from "react";
import axios from 'axios'
import { baseUrl } from "../utils/services";

export const TransacContext =createContext();


export const TransacContextProvider =({children,user})=>{

    const [transactions,setTransactions]=useState([]);
    const [newtransacError,setNewTransacError]=useState(null);
    const [retrieveTransacError,setRetrieveTransacError]=useState(null);
    const [deleteTransacError,setDeleteTransacError]=useState(null);
    const Token = user?.token;
    useEffect(()=>{
        const getTransactions =async()=>{
            if(user?.id){
                try {
                    setRetrieveTransacError(null)
                    const response= await axios.get(`${baseUrl}/api/fetchTransactions/${user?.id}`, {
                        headers: {
                          token: `Bearer ${Token}`,
                          "Content-Type": "application/json",
                          Accept: "application/json",
                        },
                      }) 
                    setTransactions(response.data)

                } catch (error) {
                    console.error(error.response.data.message)
                    setRetrieveTransacError(error.response.data.message) 
                }
                
            }
        }
        getTransactions()
    },[user])

    const addTransaction=useCallback(async(newTransaction)=>{
        try {
            setNewTransacError(null)
            const response= await axios.post(`${baseUrl}/api/newTransaction`,
            JSON.stringify(newTransaction),
            {
                headers: {
                token: `Bearer ${Token}`,
                'Content-Type': "application/json",
                'Accept': "application/json",
                }  
            }   
            )  
            const result=response.data
            setTransactions((prev)=> [...prev,result])
            
        } catch (error) {
            console.log(error.response.data.message)
            setNewTransacError(error.response.data.message)
        }
        
           
     },[])

     const deleteTransaction=async(id)=>{
        try {
            await axios.delete(`${baseUrl}/api/deleteTransaction/${id}`)  
            
            setTransactions(transactions.filter(t => {
                return t._id !== id}
                ))
            
        } catch (error) {
            console.log(error.response.data.message)
            setDeleteTransacError(error.response.data.message)
        }
        
           
     }


   return(
    <TransacContext.Provider value={{
        addTransaction,
        newtransacError,
        transactions,
        retrieveTransacError,
        deleteTransacError,
        deleteTransaction
     }}>
       {children}
     </TransacContext.Provider>
   )
}