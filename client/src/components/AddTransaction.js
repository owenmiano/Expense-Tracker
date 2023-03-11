import React,{useState,useContext} from 'react'
import {TransacContext} from '../context/TransacContext'
import {Alert} from "react-bootstrap"
import { AuthContext } from '../context/AuthContext';

function AddTransaction() {
 const [text,setText]=useState('');
 const [amount,setAmount]=useState(0);

 const {addTransaction,newtransacError}=useContext(TransacContext)
 const {user}=useContext(AuthContext)
const addNewTransaction =(e)=>{
       e.preventDefault();

    const newTransaction={
      userId:user._id,
      text,
      amount:+amount
    }
    addTransaction(newTransaction)
    setText("")
    setAmount(0)
}

 return (
    <>
    <h3>Add new transaction</h3>
      <form onSubmit={addNewTransaction}>
        <div className="form-control">
        {newtransacError &&  <Alert variant='danger'><p>{newtransacError}</p></Alert>}
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>


  )
}

export default AddTransaction