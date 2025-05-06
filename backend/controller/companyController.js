const Company=require('../models/CompanyModel');
const cloudFileUpload = require("../utils/fileUploader");

//createCompany
exports.createCompany = async (req, resp) => {
    try {
        const userId=req.user.id;
        const {companyName}=req.body;
        if (!companyName) {
            return resp.status(400).json({
                success: false,
                message: "CompanyName required!!",
            })
        }
        const checkCompanyExist=await Company.findOne({companyName});
        if(checkCompanyExist){
            return resp.status(400).json({
                success: false,
                message:"Company Name ALready Taken .Choose Other name ",
            })
        }
        const newCompany=await Company.create({companyName,created_by:userId});
        return resp.status(200).json({
            success: true,
            message:"Company Created Successfully",
            newCompany
        })
    }
    catch(err){
        return resp.status(500).json({
            success: false,
            message:"Error in Creating Company-"+err,
        })
    }
}
//updateCompany
exports.updateCompany = async (req, resp) => {
    try {       
        const {companyName,companyId,description,website}=req.body;
        const logo=req?.files?.logo;
        const updatedCompany=await Company.findByIdAndUpdate(companyId,{companyName,description,website});
        if(logo){
            const cloudResp=await cloudFileUpload(logo,"Shivam Job Portal");
            updatedCompany.logo=cloudResp.secure_url;
            await updatedCompany.save();
        }
        return resp.status(200).json({
            success: true,
            message:"Company Updated Successfully",
        })
    }
    catch(err){
        return resp.status(500).json({
            success: false,
            message:"Error in Updating Company "+err.message,
        })
    }
}
//getAllCompany of Admin User
exports.getAllCompany = async (req, resp) => {
    try { 
        const userId=req.user.id;
        const allCompany=await Company.find({created_by:userId});
        return resp.status(200).json({
            success: true,
            message:"ALl Companies Fetched Successfully",
            allCompany
        })
    }
    catch(err){
        return resp.status(500).json({
            success: false,
            message:"Error in Getting AllCompany",
        })
    }
}
//getCompanyById
exports.getCompanyById = async (req, resp) => {
    try { 
        const companyId=req.params.id;
        if (!companyId) {
            return resp.status(400).json({
                success: false,
                message: "CompanyId required!!",
            })
        }
        const companyDetails=await Company.findById(companyId);
        return resp.status(200).json({
            success: true,
            message:"Company Details Fetched Successfully",
            companyDetails
        })

    }
    catch(err){
        return resp.status(500).json({
            success: false,
            message:"Error in Getting Company By ID",
        })
    }
}