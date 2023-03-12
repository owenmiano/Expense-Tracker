import React,{useContext} from 'react'
import {TransacContext} from '../context/TransacContext'
import {numberWithCommas} from '../utils/format'
import moment from 'moment'

function Transaction({transaction}) {
  const {deleteTransaction}=useContext(TransacContext)

    const sign=transaction.amount < 0 ? '-' : '+'; 
   
  return (
    <div>
        <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
          {transaction.text} <span>{sign}Ksh {numberWithCommas(Math.abs(transaction.amount))}</span>
          <span className='transaction-footer'>{moment(transaction.createdAt).calendar()}</span>
          <button onClick={()=>deleteTransaction(transaction._id)} className="delete-btn">x</button>
        </li> 
    </div>
  )
}

export default Transaction