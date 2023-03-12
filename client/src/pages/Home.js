import React from 'react'
import '../App.css'
import AddTransaction from '../components/AddTransaction';
import Balance from '../components/Balance';
import IncomeExpenses from '../components/IncomeExpenses';
import TransactionList from '../components/TransactionList';

function Home() {
  return (

      <div className='cont'>
         <Balance/>
         <IncomeExpenses/>
         <TransactionList/>
         <AddTransaction/>
      </div>
   

  )
}

export default Home