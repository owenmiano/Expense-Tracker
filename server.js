const express=require('express');
require('dotenv').config()
const morgan =require('morgan')
const app=express();
const routes=require('./routes/transactions')
const port=process.env.PORT || 3312;
const connectDB=require('./db');
const mongoose= require('mongoose');

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// Connect To MongoDB
connectDB();

// Transactions API
app.use('/api',routes)




// Test database connection
mongoose.connection.once('open',()=>{
    console.log("Connected successfully to MongoDB")
    app.listen(port, console.log(`Server is running in ${process.env.NODE_ENV} mode on port:${port}`))

})


