const express=require('express');
require('dotenv').config();
const app=express();
const PORT=process.env.PORT || 8000;
const expressFileUpload=require('express-fileupload');
const  dbConnect=require('./config/database');
const cloudinaryConnect=require('./config/cloudinary');
const cors=require('cors');

dbConnect();
cloudinaryConnect();
const userRoutes=require('./routes/userRoutes');
const applicationRoutes=require('./routes/applicationRoutes');
const jobRoutes=require('./routes/jobRoutes');
const companyRoutes=require('./routes/companyRoutes');

app.use(express.json());
app.use(expressFileUpload({useTempFiles:true,tempFileDir:'/tmp/'}));
app.use(cors({origin:"http://localhost:5173",credentials:true}));

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/application',applicationRoutes);
app.use('/api/v1/job',jobRoutes);
app.use('/api/v1/company',companyRoutes);

app.listen(PORT,()=>console.log("Server Started at ",PORT))