const express=require('express');
const router=express.Router()
const controllers=require('../controllers/transactions')
const { verifyToken} = require("../middleware/VerifyToken");

router.get('/fetchTransactions/:userId',verifyToken,controllers.getTransactions)
// add new transaction
router.post('/newTransaction',verifyToken,controllers.addTransaction)
// delete transaction
router.delete('/deleteTransaction/:id',controllers.deleteTransaction)




module.exports=router