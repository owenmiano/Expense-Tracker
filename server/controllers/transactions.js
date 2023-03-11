const Transaction=require('../models/Transaction')
// get all transactions
exports.getTransactions=async(req,res)=>{
  const {userId}=req.params;

   try {
    const allTransactions=await Transaction.find({userId})
    return res.status(200).json(allTransactions)
   } catch (error) {
      return res.status(500).json({message:"Unable to retrieve transactions"})
   }
 }
// add new transaction
exports.addTransaction=async(req,res)=>{
try {
    const {userId,text,amount}=req.body;
    if(!text || !amount) return res.status(403).json({message:"All fields are required"})
    const newTransaction=await Transaction.create(req.body)
    return res.status(201).json(newTransaction)

} catch (error) {
  return res.status(500).json({message:"Unable to create transaction"})
}
}
// delete transaction
exports.deleteTransaction=async(req,res)=>{
try {
  const transaction = await Transaction.findById(req.params.id)
  await transaction.remove();
  return res.status(200).json({message:`Transaction has been deleted successfully`})  
} catch (error) {
    return res.status(500).json({message:"Unable to delete transaction"})
}   
}