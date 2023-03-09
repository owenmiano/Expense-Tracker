const Transaction=require('../models/Transaction')
// get all transactions
exports.getTransactions=async(req,res)=>{
  const {userId}=req.params;

   try {
    const allTransactions=await Transaction.find({userId})
    return res.status(200).json({
        success:true,
        count: allTransactions.length,
        data:allTransactions
    })
   } catch (error) {
      return res.status(500).json({
        success:false,
        error:'server error'
      })
   }
 }
// add new transaction
exports.addTransaction=async(req,res)=>{
try {
    const {userId,text,amount}=req.body;
    const newTransaction=await Transaction.create(req.body)
    return res.status(201).json({
        success:true,
        data:newTransaction
    })

} catch (err) {
    if(err.name==='ValidationError'){
      const messages=Object.values(err.errors).map(val=>val.message)
      return res.status(400).json({
        success:false,
        error:messages}
        ) 
    }
   else{ 
    return res.status(500).json({
        success:false,
        error:'server error'
      })
    }
}
}
// delete transaction
exports.deleteTransaction=async(req,res)=>{
try {
  const transaction = await Transaction.findById(req.params.id)
  if(!transaction){
    return res.status(404).json({
        success:false,
        error:`No Transaction with the id ${req.params.id} `
    })
  }
  await transaction.remove();
  res.status(200).json({
    success:true,
    data:{}
})
} catch (error) {
    return res.status(500).json({
        success:false,
        error:'server error'
      })
}   
}