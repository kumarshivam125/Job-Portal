import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

export const JobDescription = () => {
    const params = useParams();
    const [jobData, setJobData] = useState();
    const {token,userData}=useSelector(state=>state.user);
    const [apply,setApply]=useState(false);
    const fetchData = async () => {
        try {
            const resp = await axios.get(`http://localhost:4000/api/v1/job/getJobById/${params.id}`);
            console.log(resp.data);
            setJobData(resp.data?.job);
        }
        catch (err) {
            console.log("Error in fetching Job data-", err)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    useEffect(()=>{
        const isApplied=jobData?.applications.find(x=>x.userId==userData?._id);
        if(isApplied!=undefined) setApply(true);
    },[jobData])
    async function applyButtonHandler(){
        try{
            const resp=await axios.post("http://localhost:4000/api/v1/job/applyJob",{jobId:params.id},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            toast.success("Job Applied Successfully");
            console.log("Apply job resp-",resp);
            fetchData();
        }
        catch(err){
            toast.error(err.response.data.message);
            console.log("Error while Applying Job",err);
        }
    }
    return (
        <div className="max-w-[1100px] mx-auto">
            <div className="flex justify-between">
                <div>
                    <h1 className="font-bold text-[20px] mb-3 ">{jobData?.title}</h1>
                    <div className="flex gap-x-1 ">
                        <div className="bg-white border  text-red-400  font-bold text-[15px] rounded-full px-1.5   py-0.5 ">{jobData?.positions} positions</div>
                        <div className="bg-white border  text-[#6A38C2] font-bold text-[15px] rounded-full px-1.5 py-0.5 ">{jobData?.jobType}</div>
                        <div className="bg-white border  text-blue-400   font-bold text-[15px] rounded-full px-1.5 py-0.5 ">{jobData?.salary}LPA</div>
                    </div>
                </div>
                <button className="bg-[#6A38C2] border text-white h-[40px] px-4 font-semibold py-1.5  cursor-pointer rounded-md"
                onClick={applyButtonHandler} disabled={apply}>{apply?"Applied":"Apply Now"}</button>
            </div>
            <p className="font-semibold text-[20px]  mt-3">Job Description</p>
            <hr className="my-2.5 h-1 " />
            <div className="flex flex-col">
                <div className="flex gap-x-1">
                    <p className="font-bold ">Role: </p>
                    <p className="text-gray-600  font-medium">{jobData?.title}</p>
                </div>
                <div className="flex gap-x-1">
                    <p className="font-bold ">Location: </p>
                    <p className="text-gray-600  font-medium">{jobData?.location}</p>
                </div>
                <div className="flex gap-x-1">
                    <p className="font-bold ">Description: </p>
                    <p className="text-gray-600  font-medium">{jobData?.description}</p>
                </div>
                <div className="flex gap-x-1">
                    <p className="font-bold ">Salary: </p>
                    <p className="text-gray-600  font-medium">{jobData?.salary} LPA</p>
                </div>
                <div className="flex gap-x-1">
                    <p className="font-bold ">No of Openings: </p>
                    <p className="text-gray-600  font-medium">{jobData?.positions}</p>
                </div>
                <div className="flex gap-x-1">
                    <p className="font-bold ">Skills: </p>
                    <div className="flex gap-x-2">
                        {
                            jobData?.requirements.map((skill, ind) => (
                                <p className="text-black font-bold   rounded-full px-1.5  bg-gray-300 py-0.5 border " key={ind}>{skill}</p>
                            ))
                        }
                    </div>
                </div>
                <div className="flex gap-x-1">
                    <p className="font-bold ">Posted At: </p>
                    <p className="text-gray-600  font-medium">{jobData?.createdAt.split("T")[0]}</p>
                </div>           
                <div className="flex gap-x-1">
                    <p className="font-bold ">Total Applicants: </p>
                    <p className="text-gray-600  font-medium">{jobData?.applications?.length}</p>
                </div>           
            </div>
        </div>
    )
}