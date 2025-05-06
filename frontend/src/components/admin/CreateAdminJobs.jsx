import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { setCompanyDetails } from "@/redux/companySlice";
const CreateAdminJobs = () => {
    const {allCompany}=useSelector(state=>state.company);
    const {token}=useSelector(state=>state.user);
    const [data, setData] = useState({
        title: '',
        description: '',
        location: '',
        positions: '',
        salary: '',
        jobType: '',
        requirements: '',
        companyId: ''
    })
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(data);
        if(allCompany?.length==0){
            toast.error("You have not registered any company");
            return;
        }
        try{
            const resp=await axios.post("http://localhost:4000/api/v1/job/createJob",data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            toast.success("Job created Successfully");
            console.log("Create Job resp",resp);
            navigate("/admin/jobs");
        }
        catch(err){
            toast.error(err?.response?.data?.message);
            console.log("Error in Creating Job")
        }
    }
    const changeHandler = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    return (
        <div className='max-w-[1100px] mx-auto mt-11 '>
            <div className="flex justify-center">
                <form onSubmit={submitHandler}>
                    <div className="min-w-[500px] bg-gray-50   border rounded-md px-5 py-4  ">
                        <div className="flex items-center text-[30px] gap-x-3 mb-2 ">
                            <IoMdArrowRoundBack className="cursor-pointer" onClick={() => navigate('/admin/jobs')} />
                            <h1 className="font-bold">Job Details</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-3 ">
                            <div className="flex gap-x-2">
                                <p className="font-bold">Job Title</p>
                                <input type='text' onChange={changeHandler} name='title' className="outline w-[70%] p-1" value={data.title}/>
                            </div>
                            <div className="flex gap-x-2">
                                <p className="font-bold">Location</p>
                                <input type='text' onChange={changeHandler} name='location' className="outline w-[70%] p-1" value={data.location} />
                            </div>
                            <div className="flex gap-x-2">
                                <p className="font-bold">Description</p>
                                <input type='text' onChange={changeHandler} name='description' className="outline w-[70%] p-1" value={data.description} />
                            </div>
                            <div className="flex gap-x-2">
                                <p className="font-bold">No of Positions</p>
                                <input type='text' onChange={changeHandler} name='positions' className="outline w-[70%] p-1" value={data.positions} />
                            </div>
                            <div className="flex gap-x-2">
                                <p className="font-bold">Salary</p>
                                <input type='text' onChange={changeHandler} name='salary' className="outline w-[70%] p-1" value={data.salary} />
                            </div>
                            <div className="flex gap-x-2">
                                <p className="font-bold">Job Type</p>
                                <input type='text' onChange={changeHandler} name='jobType' className="outline w-[70%] p-1" value={data.jobType} />
                            </div>
                            <div className="flex gap-x-2">
                                <p className="font-bold">Requirements</p>
                                <input type='text' onChange={changeHandler} name='requirements' className="outline w-[70%] p-1" value={data.requirements} />
                            </div>
                            <div className="flex gap-x-2">
                                <p className="font-bold">Select Company</p>
                                <select className="p-1 px-5" name="companyId" onChange={changeHandler}>
                                    <option value="select">-Select-</option>
                                    {
                                        allCompany.map((company)=>(
                                            <option value={company?._id} key={company?._id}>{company?.companyName}</option>
                                        ))
                                    }
                                </select>
                            </div>  
                        </div>
                        <button type="submit" className="bg-black text-white border font-semibold py-1.5 cursor-pointer rounded-md w-full mt-3">Create Job</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateAdminJobs;