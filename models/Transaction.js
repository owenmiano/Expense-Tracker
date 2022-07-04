const mongoose =require('mongoose')
const TransactionSchema=new mongoose.Schema({
    text:{
        type:String,
        trim:true,
        required:[true,'Please add some text']
    },
    amount:{
        type:Number,
        required:[true,'Please add a positive or negative number']
    },
    createdAt:{
        type:String,
        default:new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'})
    }
})
module.exports=mongoose.model('Transaction',TransactionSchema)