const cloudinary=require('cloudinary').v2;
require('dotenv').config();

const cloudinaryConnect=async()=>{
    try{

        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })
    }
    catch(err){
        console.log("Error in Cloudinary Connection",err.message);
    }
}
module.exports=cloudinaryConnect;