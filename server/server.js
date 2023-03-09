const path=require('path')
const express=require('express');
require('dotenv').config()
const morgan =require('morgan')
const app=express();
const port=process.env.PORT ;
const connectDB=require('./db');
const mongoose= require('mongoose');

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const auth=require('./routes/auth')
const api=require('./routes/transactions')

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

// Connect To MongoDB
connectDB();

// Transactions API
app.use('/api',api)
app.use('/auth',auth)

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'client','build','index.html')))
}



// Test database connection
mongoose.connection.once('open',()=>{
    console.log(`Connected Successfully to the Database: ${mongoose.connection.name}`)
    app.listen(port, console.log(`Server is running in ${process.env.NODE_ENV} mode on port:${port}`))

})
//  NOTICE
    // "dev": "concurrently \"npm run server\" \"npm run client\""


