import React, {createContext,useReducer} from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'
// initial state
const initialState={
    transactions:[],
    error:null,
    loading:true
}

// Create context
export const GlobalContext=createContext(initialState)

// Provider Component
export const GlobalProvider=({children})=>{
     const [state,dispatch]=useReducer(AppReducer,initialState)
    
      //Actions
    async function getTransactions(){
      try {
        const res=await axios.get('/api/fetchTransactions');

        dispatch({
          type:'GET_TRANSACTIONS',
          payload:res.data.data
        })
      } catch (error) {
        dispatch({
          type:'TRANSACTION_ERROR',
          payload:error.response.data.error
        })
      }

    }


     //delete transaction
  async function deleteTransaction(id){
        try {
          await axios.delete(`/api/deleteTransaction/${id}`)

          dispatch({
            type:'DELETE_TRANSACTION',
            payload: id
          })
        } catch (error) {
          dispatch({
          type:'TRANSACTION_ERROR',
          payload:error.response.data.error
        })
        }    
 }
  
      // add transaction
     async function addTransaction(transaction){
       const config={
        header:{
          'Content-Type':'application/json'
        }
       }
       try {
        const res= await axios.post('/api/newTransaction',transaction,config)
        dispatch({
          type:'ADD_TRANSACTION',
          payload: res.data.data
        })
       } catch (error) {
        dispatch({
          type:'TRANSACTION_ERROR',
          payload:error.response.data.error
        })
       }
 }


     return (<GlobalContext.Provider value={{
       transactions:state.transactions,
       error:state.error,
       loading:state.loading,
       getTransactions,
       deleteTransaction,
       addTransaction
     }}>
                 {children}
     </GlobalContext.Provider>)
}