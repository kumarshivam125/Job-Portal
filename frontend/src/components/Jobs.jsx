import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilterdJobs, setJobFilter } from "@/redux/jobSlice";
import img1 from "../assets/noJob.jpg";
const filters = [
    {
        title: "Location",
        arr: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"]
    },
    {
        title: "Industry",
        arr: ["Frontend Developer", "Backend Developer", "Data Science", "FullStack Developer", "Nextjs Developer"]
    },
    {
        title: "Salary",
        arr: ["1LPA-4LPA", "5LPA-10LPA", "11LPA-15LPA"]
    }
];

export const Jobs = () => {
    const {allJobs}=useSelector(state=>state.job);
    const dispatch=useDispatch();
    const {jobFilter,filteredJobs}=useSelector(state=>state.job);
    function changeHandler(e){
        dispatch(setJobFilter(e.target.value));
    }   
    useEffect(()=>{
        console.log("FILTER-",jobFilter)
        if(jobFilter=="1LPA-4LPA" || jobFilter=="5LPA-10LPA" ||jobFilter=="11LPA-15LPA")
        {
            let [lower,upper]=jobFilter.split("-");
            lower=Number(lower.substring(0, lower.length - 3));
            upper=Number(upper.substring(0, upper.length - 3));
            dispatch(setFilterdJobs(allJobs?.filter(x=>x.salary>=lower&& x.salary<=upper)));
        }
        else{
            if(jobFilter)
                dispatch(setFilterdJobs(allJobs?.filter(x=>x.title.toLowerCase().includes(jobFilter?.toLowerCase()) || x.location.toLowerCase().includes(jobFilter?.toLowerCase()))))
            else
            dispatch(setFilterdJobs(allJobs));
        }
    },[jobFilter,allJobs])
    
    // console.log("FILTERed Jobs--",filteredJobs);
    return (
        <div className="max-w-[1100px] mx-auto">
            <div className="flex justify-between  ">
                <div className="bg-gray-100 border rounded-[10px] pr-[30px] pl-[10px]">
                    <div className="flex justify-between items-center pt-2">
                        <h1 className="font-black text-[23px] ">Job Filter</h1>
                        <div className="bg-blue-300 p-1  rounded-md font-semibold cursor-pointer" onClick={()=>dispatch(setJobFilter(null))}>Clear</div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        {
                            filters.map((obj, ind) => (
                                <div key={ind}>
                                    <p className="font-semibold text-[22px] ">{obj.title}</p>
                                    <div>
                                        {
                                            obj.arr.map((loc, ind1) => (
                                                <div className="flex gap-x-1 " key={ind1} >
                                                    <input type="radio" onChange={changeHandler} id="JobFilter" value={loc} checked={loc===jobFilter} className="cursor-pointer "/>
                                                    <label htmlFor="jobFilter" className="cursor-pointer  ">{loc}</label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 w-[80%]  overflow-y-scroll h-[85vh]  "> 
                    {
                        filteredJobs?.length==0  ?
                        <div >
                            <img src={img1} className="w-[700px] "/>
                        </div>
                        :
                        filteredJobs?.map((job,ind) => (
                            <div className="bg-gray-100 border rounded-[10px] px-[15px]  py-[20px] space-y-2 h-[270px]" key={ind}>
                                <div className="flex gap-x-2  ">
                                    <img src={job.companyId.logo} className="w-[50px]" />
                                    <div>
                                        <p className="font-semibold text-[20px] text-black ">{job.companyId.companyName}</p>
                                        <p className="text-[15px]">{job.location}</p>
                                    </div>
                                </div>
                                <p className="font-bold  text-[20px] ">{job.title}</p>
                                <p>{job.description.substr(0,50)+"...."}</p>
                                <div className="flex gap-x-1 ">
                                    <div className="bg-white border  text-red-400  font-bold text-[15px] rounded-full px-1.5   py-0.5 ">{job?.positions} positions</div>
                                    <div className="bg-white border text-[#6A38C2] font-bold text-[15px] rounded-full px-1.5 py-0.5 ">{job?.jobType}</div>
                                    <div className="bg-white border  text-blue-400   font-bold text-[15px] rounded-full px-1.5 py-0.5 ">{job?.salary}LPA</div>
                                </div>
                                <Link to={`/description/${job?._id}`}><button className="bg-white   border  px-4 font-semibold py-2 cursor-pointer rounded-md">Details</button></Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}