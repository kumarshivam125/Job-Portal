import { setFilterdJobs, setSearchJobText } from "@/redux/jobSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../assets/noJob.jpg";
import { Link } from "react-router-dom";
const Browse = () => {
    const { searchJobText, allJobs, filteredJobs } = useSelector(state => state.job);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("searchJobText",searchJobText);
        if (searchJobText)
            dispatch(setFilterdJobs(allJobs.filter(x => x.title.toLowerCase().includes(searchJobText.toLowerCase()))));
        else
            dispatch(setFilterdJobs(allJobs));

        return () => {
            dispatch(setSearchJobText(null));
            dispatch(setFilterdJobs(null));
        }
    }, [])
    return (
        <div className="max-w-[1100px] mx-auto">
            <h1 className="font-bold text-[25px] ">Search Results ({filteredJobs?.length})</h1>
            <div className="grid grid-cols-3 gap-3 mb-8   ">
                {
                    filteredJobs?.length == 0 ?
                        <div >
                            <img src={img1} className="w-[700px] " />
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
                                <p>{job.description.substr(0, 50) + "...."}</p>
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
    )
}
export default Browse;