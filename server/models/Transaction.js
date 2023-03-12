const mongoose =require('mongoose')
const TransactionSchema=new mongoose.Schema({
    userId:{
        type:String,
    },
    text:{
        type:String,
        trim:true,
        required:[true,'Please add some text']
    },
    amount:{
        type:Number,
        required:[true,'Please add a positive or negative number']
    },
},

{   
     timestamps:true
})
module.exports=mongoose.model('Transaction',TransactionSchema)