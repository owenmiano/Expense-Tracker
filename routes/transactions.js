const express=require('express');
const router=express.Router()
const controllers=require('../controllers/transactions')

router.get('/fetchTransactions',controllers.getTransactions)
// add new transaction
router.post('/newTransaction',controllers.addTransaction)
// delete transaction
router.delete('/deleteTransaction/:id',controllers.deleteTransaction)




module.exports=router