const express=require('express');

const router=express.Router();
const {auth}=require('../middleware/auth');

const {createCompany,updateCompany,getAllCompany,getCompanyById}=require('../controller/companyController');
router.post('/createCompany',auth,createCompany);
router.post('/updateCompany',updateCompany);
router.get('/getAllCompany',auth,getAllCompany);
router.get('/getCompanyById/:id',getCompanyById);


module.exports=router;
