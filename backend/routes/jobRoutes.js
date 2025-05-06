const express=require('express');
const router=express.Router();
const {auth}=require('../middleware/auth');

const {createJob,applyJob,allJobs,getJobById,getAdminJobs}=require('../controller/jobController');
router.post('/createJob',auth,createJob);
router.post('/applyJob',auth,applyJob);
router.get('/getAlljobs',allJobs);
router.get('/getJobById/:id',getJobById);
router.get('/getAdminJobs',auth,getAdminJobs);

module.exports=router;