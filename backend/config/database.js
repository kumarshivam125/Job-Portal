const mongoose=require('mongoose');
require('dotenv').config();

const dbConnect=async()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB Connection Done"))
    .catch((err)=>console.log("Error in DB Connection",err.message))
}
module.exports=dbConnect;