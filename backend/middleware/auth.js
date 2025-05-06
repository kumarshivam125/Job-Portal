const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=async(req,resp,next)=>{
    try{
        const token=req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return resp.status(401).json({
                success:false,
                message:"Token Misssing"
            })
        }
        try{
            const payload=await jwt.verify(token,process.env.JWT_SECRET);
            req.user=payload;
        }
        catch(err){
            return resp.status(401).json({
                success:false,
                message:"Token Invalid"
            })
        }
        next();
    }
    catch(err){
        return resp.status(500).json({
            success:false,
            message:"Error in Validating Token "+err.message
        })
    }
}