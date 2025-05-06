import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminJobs } from "@/redux/jobSlice";
import toast from "react-hot-toast";
const AdminJob = () => {
    const { token } = useSelector(state => state.user);
    const {allCompany}=useSelector(state=>state.company);
    const {adminJobs}=useSelector(state=>state.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchComapnies = async () => {
            try {
                const resp = await axios.get("http://localhost:4000/api/v1/job/getAdminJobs", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("All Admin Jobs", resp.data)
                dispatch(setAdminJobs(resp.data.jobs));
            }
            catch (err) {
                console.log("Error while Fetching all Admin Jobs", err.message)
            }
        }
        fetchComapnies();
    }, [])
    function changePageHandler(){
        if(allCompany?.length==0){
            toast.error("You have not registered any company");
            return;
        }
        navigate('/admin/jobs/create');
    }
    const [tempJobs,setTempJobs]=useState(adminJobs);
    const [jobFilter,setJobFilter]=useState();
    useEffect(()=>{
        if(!jobFilter)
            setTempJobs(adminJobs);
        else 
            setTempJobs(adminJobs.filter(x=>x.title.toLowerCase().includes(jobFilter.toLowerCase()) || x.companyId?.companyName?.toLowerCase().includes(jobFilter.toLowerCase())));
    },[jobFilter])
    return (
        <div className="max-w-[1100px] mx-auto mt-11">
            <div className="flex justify-between ">
                <input className="outline " type="text" onChange={(e)=> setJobFilter(e.target.value)}/>
                <button className="bg-gray-600   text-white border px-4 font-semibold py-2 cursor-pointer rounded-md"
                    onClick={changePageHandler}>New Job</button>
            </div>
            <div>
                <table className="w-full my-10 ">
                    <thead>
                        <tr className="bg-yellow-400 text-center  ">
                            <th>Company</th>
                            <th>Role</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tempJobs && tempJobs.map((job,ind) => (
                                <tr className="text-center border " key={ind}>
                                    <td className="py-1.5">{job?.companyId?.companyName}</td>
                                    <td>{job?.title}</td>
                                    <td>{job?.createdAt?.split("T")[0]}</td>
                                    <td className="font-extrabold cursor-pointer" onClick={()=>{
                                        navigate(`/admin/jobs/${job?._id}/applicants`);
                                    }}>Applicants</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default AdminJob;


