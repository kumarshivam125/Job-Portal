const express=require('express');
const {auth}=require('../middleware/auth');

const router=express.Router();
const {SignUp,login,updateProfile}=require('../controller/userController');
router.post("/signup",SignUp);
router.post("/login",login);
router.post('/updateProfile',auth,updateProfile);

module.exports=router;