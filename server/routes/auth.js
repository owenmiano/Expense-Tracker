const router=require("express").Router();
const authController=require('../controllers/authController')

// Users Registration Route
router.post("/register-user",authController.registerUser)


  // Users Login Route
router.post("/login-user",authController.loginUser)


module.exports=router
