const User = require("../models/UserModel");
const cloudFileUpload = require("../utils/fileUploader");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.SignUp=async(req,resp)=>{
    try {
        const {fullName,email,password,role}=req.body;
        const img=req.files.img;
        if(!fullName || !email || !password || !role || !img){
            return resp.status(400).json({
                success:false,
                message:"All Fields are Required"
            })
        }
        const user=await User.findOne({email});
        if(user){
            return resp.status(400).json({
                success:false,
                message:"Email Already Taken"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({fullName,email,password:hashedPassword,role});
        const cloudResp=await cloudFileUpload(img,"Shivam Job Portal");
        newUser.profile.profilePhoto=cloudResp.secure_url;
        await newUser.save();

        return resp.status(200).json({
            success:true,
            message:"Account Created Successfully"
        })
    }
    catch (err) {
        return resp.status(500).json({
            success:false,
            message:"Error in Signup--"+err.message
        })
    }
}

exports.login=async(req,resp)=>{
    try {
        const {email,password}=req.body;
        if( !email || !password ){
            return resp.status(400).json({
                success:false,
                message:"All Fields are Required"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return resp.status(400).json({
                success:false,
                message:"You Are Not Registered With Us"
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return resp.status(400).json({
                success:false,
                message:"Password Dont Match"
            })
        }
        const payload={
            id:user._id
        }
        const user1=await User.findOne({email}).select("-password");
        const token=await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'});

        return resp.status(200).json({
            success:true,
            message:"Logged in Successfully",
            token,
            user1
        })
    }
    catch (err) {
        return resp.status(500).json({
            success:false,
            message:"Error in Signup--"+err.message
        })
    }
}
//updateProfile
exports.updateProfile=async(req,resp)=>{
    try{
        const {fullName,bio,skills}=req.body;
        const userId=req.user.id;
        const resume=req.files?.resume;
        const user=await User.findById(userId);
        if(resume){
            const cloudResp=await cloudFileUpload(resume,"Shivam Job Portal");
            user.profile.resume=cloudResp.secure_url;
            user.profile.resumeOriginalName=resume.name;
        }
        if(skills) user.profile.skills=skills.split(' ');
        if(bio) user.profile.bio=bio;
        if(fullName) user.fullName=fullName;

        await user.save();
        return resp.status(200).json({
            success:true,
            message:"User Details Updated Successfully",
            user
        })
    }
    catch (err) {
        return resp.status(500).json({
            success:false,
            message:"Error in Update Profile--"+err
        })
    }
}
