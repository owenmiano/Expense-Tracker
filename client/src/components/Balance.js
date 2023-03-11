import React,{useContext} from 'react'
import {TransacContext} from '../context/TransacContext'
import {numberWithCommas} from '../utils/format'
function Balance() {
  const {transactions}=useContext(TransacContext)
  const amounts=transactions?.map(transaction=>transaction.amount)
  const total=amounts?.reduce((acc,item)=>(acc += item),0).toFixed(2)

  return (
    <div>
        <h4>Your Balance</h4>
        <h1>Ksh {numberWithCommas(total)}</h1>
    </div>
  )
}

export default Balance