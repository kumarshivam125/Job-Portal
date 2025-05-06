const cloudinary=require('cloudinary').v2;
const cloudFileUpload=async(file,folder)=>{
    const options={ resource_type: "auto",folder};
    const result=await cloudinary.uploader.upload(file.tempFilePath,options);
    return result
}
module.exports=cloudFileUpload;