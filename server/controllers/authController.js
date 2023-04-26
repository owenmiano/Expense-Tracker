const bcrypt=require("bcrypt")
const Users=require('../models/User');
const  JWT =require('jsonwebtoken')
const validator = require("validator");


// User Registration Route
exports.registerUser=async(req,res)=>{
    //  validate user

     const {password,email,userName}=req.body
     if(!email || !password || !userName) return res.status(403).json({message:"All fields are required"})


     // validate email
     if(!validator.isEmail(email)) return res.status(403).json({message:"Enter a valid email"})
     // validate password
     if(!validator.isStrongPassword(password)) return res.status(403).json({message:"Password should be at least 8 characters long, A mixture of both uppercase and lowercase letters.A mixture of letters and numbers.Inclusion of at least one special character, e.g., ! @ # ?"})
    
    
     // validate email
     const emailExist=await Users.findOne({email});
     if(emailExist){
      return res.status(403).json({message:"This user already exists"})

     }
    
     //    Get the hashed Password
    const  hashedPassword=await bcrypt.hash(password,10)
    try {
          const newUser= await Users.create({
            userName,
            email,
            password:hashedPassword
          })
          const token=await JWT.sign({
            id:Users._id,
        },
            process.env.JWT_SECRET_KEY,{
            expiresIn:360000
          })
          const {password,...others}=newUser._doc
    
         return res.status(201).json({message:`Hurray! you have registered successfully.`,...others})
        } catch (error) {
          console.log(error.message)
          return res.status(500).json({message:"Unable to create your account"})
        }
}



// User Login Route
exports.loginUser=async(req,res)=>{
  const {password,email,}=req.body

 if(!email || !password) return res.status(403).json({message:"All fields are required"})
   // first check if the email exists in the database
   if(!validator.isEmail(email)) return res.status(403).json({message:"Enter a valid email"})
   // validate password
  
   try {
    const user=await Users.findOne({email:req.body.email})
    if(!user){
      return res.status(401).json({message:"This user does not exist!"})
    }
 
    // that means user is existing and trying to sign in from the right portal
     // check for password
     let isMatch=await bcrypt.compare(req.body.password,user.password);
     // if password is incorrect
     if(!isMatch){
      return res.status(403).json({message:"Incorrect Password"})

         }

 // if password is correct
 const token=await JWT.sign({
  id:user._id,
},
  process.env.JWT_SECRET_KEY,{
  expiresIn:360000
})
     const {password,...others}=user._doc

     return res.status(200).json({message:"Hurray! You are now logged in",...others})
   } catch (error) {
    return res.status(500).json({message:"Unable to Login to your account"})

   }
  
    
}