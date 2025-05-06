const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:["student","recruiter"]
    },
    profile:{
        bio:{type:String},
        resume:{type:String},
        resumeOriginalName:{type:String},
        skills:[{type:String}],
        profilePhoto:{
            type:String,
            default:""
        }
    }
},{timestamps:true});
const User=mongoose.model('User',userSchema);
module.exports=User;