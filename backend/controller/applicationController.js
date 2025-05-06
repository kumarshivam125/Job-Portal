const Job = require('../models/JobModel');
const Application=require('../models/ApplicationModel');

exports.getApplicants = async (req, resp) => {
    try {
        const { jobId } = req.params;
        if (!jobId) {
            return resp.status(400).json({
                success: false,
                message: "JobId required!!",
            })
        }
        // console.log("In backend JOBID--",jobId);
        const allApplicants = await Application.find({jobId}).populate({
            path: "userId",
        });
        return resp.status(200).json({
            success:true,
            message:"ALL applicants Feteched",
            allApplicants
        })
    }
    catch (err) {
        return resp.status(500).json({
            success: false,
            message:"Error in fetching All Applicants-"+err,
        })
    }
}
//myApplications
exports.myApplications = async (req, resp) => {
    try {
        const userId=req.user.id;
        const applications=await Application.find({userId}).populate({
            path:"jobId",
            populate:{
                path:"companyId"
            }
        });
        return resp.status(200).json({
            success: true,
            message:"MyApplications Fetched",
            applications
        })
    }
    catch (err) {
        return resp.status(500).json({
            success: false,
            message:"Error in fetching MyApplications-"+err,
        })
    }
}
//changeJobSatus
exports.changeJobSatus = async (req, resp) => {
    try {
        const {applicationId,status}=req.body;
        if(!applicationId || !status){
            return resp.status(401).json({
                success: false,
                message:"All Fields are required",
            })
        }
        const updatedApplication=await Application.findByIdAndUpdate(applicationId,{status});
        return resp.status(200).json({
            success: true,
            message:"Status Updated Successfully",
        })
    }
    catch (err) {
        return resp.status(500).json({
            success: false,
            message:"Error in Changing Job Status"+err,
        })
    }
}