const Job = require('../models/JobModel');
const Application=require('../models/ApplicationModel');

//createJob
exports.createJob = async (req, resp) => {
    try {
        const userId = req.user.id;
        const { title, description, location, positions, salary, jobType, requirements, companyId } = req.body;
        if (!title || !description || !location || !positions || !salary || !jobType || !requirements || !companyId) {
            return resp.status(400).json({
                success: false,
                message: "All Fields are required ",
            })
        }
        const newJob = await Job.create({ title, description, location, positions: Number(positions), salary:Number(salary), jobType, requirements: requirements.split(' '), companyId, created_by: userId });
        return resp.status(200).json({
            success: true,
            message: "Job Created Successfully",
            newJob
        })
    }
    catch (err) {
        return resp.status(500).json({
            success: false,
            message: "Error in Creating Job-" + err,
        })
    }
}

//applyJob
exports.applyJob=async(req,resp)=>{
    try {
        const {jobId}=req.body;
        if(!jobId){
            return resp.status(401).json({
                success: false,
                message: "Job ID missing",
            })
        }
        const userId=req.user.id;
        const application=await Application.findOne({userId,jobId});
        const job=await Job.findById(jobId);
        const checkAlreadyApplied=job.applications.includes(application?._id);
        if(checkAlreadyApplied){
            return resp.status(400).json({
                success: false,
                message: "Already applied to this Job ",
            })
        }
        const newApplication=await Application.create({userId,jobId});
        job.applications.push(newApplication._id);
        await job.save();
        return resp.status(200).json({
            success: true,
            message: "Job Applied Successfully",
            newApplication
        })
    }
    catch (err) {
        return resp.status(500).json({
            success: false,
            message: "Error in Applying Job-" + err,
        })
    }
}
//allJobs
exports.allJobs = async (req, resp) => {
    try {
        const filter=req.query.filter||"";
        const jobs=await Job.find({
            $or:[
                {title:{$regex:filter, $options:"i"}},
                {description:{$regex:filter, $options:"i"}},
            ]
        }).populate("companyId")
        return resp.status(200).json({
            success: true,
            message: "ALl Jobs Fetched ",
            jobs
        })
    }
    catch (err) {
        return resp.status(500).json({
            success: false,
            message: "Error in Fetching ALL Job-" + err,
        })
    }
}
//getJobById
exports.getJobById = async (req, resp) => {
    try {
        const jobId=req.params.id;
        console.log(jobId)
        const job=await Job.findById(jobId).populate("companyId").populate({
            path:"applications",
            select:"userId"
        });
        return resp.status(200).json({
            success: true,
            message: "Job Fetched By ID",
            job
        })
    }
    catch (err) {
        return resp.status(500).json({
            success: false,
            message: "Error in Fetching Job By Id -" + err,
        })
    }
}
//getAdminJobs
exports.getAdminJobs = async (req, resp) => {
    try {
        const userId=req.user.id;
        const jobs=await Job.find({created_by:userId}).populate("companyId");
        return resp.status(200).json({
            success: true,
            message: "ALl Admin Jobs Fetched Successfully",
            jobs
        })
    }
    catch (err) {
        return resp.status(500).json({
            success: false,
            message: "Error in Fetching Admin Job-" + err,
        })
    }
}