const mongoose=require('mongoose');

const companySchema=new mongoose.Schema({
    companyName:{
        type:String,
    },
    description:{
        type:String,
    },
    website:{
        type:String,
    },
    logo:{
        type:String,
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
},{timestamps:true});
const Company=mongoose.model('Company',companySchema);
module.exports=Company;