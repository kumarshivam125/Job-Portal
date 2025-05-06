import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"

export const ViewApplicants = () => {
    const params = useParams();
    const [applicants, setApplicants] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`http://localhost:4000/api/v1/application/getApplicants/${params.id}`);
                console.log(resp.data);
                setApplicants(resp.data?.allApplicants);
            }
            catch (err) {
                console.log("Error in fetching Applicants-", err?.response.data?.message)
            }
        }
        fetchData();
    }, [])
    // console.log("Application Array--", applicants)
    async function statusHandler(status,applicationId){
        try{
            const resp=await axios.post('http://localhost:4000/api/v1/application/changeJobStatus',{applicationId,status});
            toast.success("Status Updated Successfully");
            console.log("Change Status Response--",resp);
        }
        catch(err){
            toast.error("Cannot Update Status");
            console.log("Error in Updating Job Status",err)
        }
    }
    return (
        <div className="max-w-[1100px] mx-auto">
            Applicants ({applicants?.length})
            <table className="w-full my-10 ">
                <thead>
                    <tr className="bg-yellow-400 text-center  ">
                        <th>FullName</th>
                        <th>Email</th>
                        <th>Resume</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applicants && applicants.map((app, ind) => (
                            <tr key={ind} className="text-center border">
                                <td className="py-2 ">{app?.userId?.fullName}</td>
                                <td>{app?.userId?.email}</td>
                                <td>
                                    {
                                        app?.userId?.profile?.resume?
                                        <a href={app?.userId?.profile?.resume} target="_blank" className="text-blue-400 underline ">{app?.userId?.profile?.resumeOriginalName}</a>
                                        :"NA"                                        
                                    }
                                </td>
                                <td>{app.createdAt.split("T")[0]}</td>
                                <td className="  ">
                                    <div className="flex gap-x-2 ml-[20%]">
                                        <button className="bg-green-400 font-semibold px-2 rounded-md cursor-pointer" onClick={()=>statusHandler("accepted",app?._id)}>Accept</button>
                                        <button className="bg-red-500 font-semibold px-2 rounded-md cursor-pointer" onClick={()=>statusHandler("rejected",app?._id)}>Reject</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}