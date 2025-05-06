const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    location:{
        type:String,
    },
    positions:{
        type:Number,
    },
    salary:{
        type:Number,
    },
    jobType:{
        type:String
    },
    requirements:[{type:String,}],
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    applications:[{type:mongoose.Schema.Types.ObjectId, ref:'Application'}]

},{timestamps:true});
const Job=mongoose.model('Job',jobSchema);
module.exports=Job;