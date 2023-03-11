import React,{useContext} from 'react'
import {TransacContext} from '../context/TransacContext'
import {Alert} from "react-bootstrap"
import Transaction  from './Transaction'

function TransactionList() {
    const {transactions,retrieveTransacError}=useContext(TransacContext)


  return (
    <>
    <h3>History</h3>
      <ul className="list">
      {retrieveTransacError &&  <Alert variant='danger'><p>{retrieveTransacError}</p></Alert>}
        {transactions?.map(transaction=>(<Transaction key={transaction._id} transaction={transaction}/>))}
      </ul>
    </>
  )
}

export default TransactionList