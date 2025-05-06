const express=require('express');
const {auth}=require('../middleware/auth');

const router=express.Router();
const {getApplicants,myApplications,changeJobSatus}=require('../controller/applicationController');
router.get("/getApplicants/:jobId",getApplicants);
router.post("/myApplications",auth,myApplications);
router.post('/changeJobStatus',changeJobSatus);

module.exports=router;