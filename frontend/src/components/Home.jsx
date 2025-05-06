import { setAllJobs, setSearchJobText } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const dispatch=useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get('http://localhost:4000/api/v1/job/getAlljobs');
                console.log(resp.data);
                dispatch(setAllJobs(resp.data?.jobs));
            }
            catch (err) {
                console.log("Error in fetching Jobs-", err)
            }
        }
        fetchData();
    }, [])
    const [input,setInput]=useState("");
    const navigate=useNavigate();
    return (
        <div className="max-w-[1100px] mx-auto">
            <h1 className="font-bold text-[40px]  max-w-[400px] mx-auto ">Search Applay and Get Your <span className="text-[#6A38C2] ">Dream Job</span></h1>
            <p className="mx-auto text-center text-[30px]">JobHunt is <span className="font-bold text-red-400">Number 1</span> Job Search Website</p>
            <div className="flex mx-auto  my-10 w-[400px] rounded-full ">
                <input type="text" className="w-[90%] outline bg-gray-200 py-2 px-2 rounded-l-full font-semibold" placeholder="Find Your Dream Job" 
                    onChange={(e)=>setInput(e.target.value)} value={input}
                />
                <button className="bg-[#6A38C2] w-[10%] text-white  text-[20px] flex justify-center items-center cursor-pointer  rounded-r-full"
                onClick={()=>{
                    dispatch(setSearchJobText(input));
                    navigate("/browse")
                }}><FaSearch/></button>
            </div>
        </div>
    )
}
export default Home;