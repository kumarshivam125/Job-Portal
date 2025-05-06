import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import Modal from "./Modal";
import { Link } from "react-router-dom";
const Profile = () => {
    const { token } = useSelector(state => state.user);
    const [myJobs, setMyJobs] = useState([]);
    const { userData } = useSelector(state => state.user);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.post('http://localhost:4000/api/v1/application/myApplications', {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setMyJobs(resp.data?.applications);
                console.log("Response--", resp.data);
            }
            catch (err) {
                console.log("Error in fetching My Jobs-", err)
            }
        }
        fetchData();
    }, [])
    console.log("User data", userData)
    return (
        <div className="max-w-[1100px] mx-auto">
            <div className="border p-10 flex flex-col gap-y-2">
                <div className="flex justify-between ">
                    <div className="flex gap-x-3 items-center font-bold text-[30px]">
                        <img src={userData?.profile?.profilePhoto} className="w-[50px] h-[50px]  " />
                        <p>{userData?.fullName}</p>
                    </div>
                    <div className="border flex justify-center items-center rounded-md cursor-pointer  px-2">
                        <MdEdit className="text-[30px]" onClick={() => setVisible(true)} />
                    </div>
                </div>
                <div className="flex gap-x-2 items-center ">
                    <MdEmail className="text-[20px]" />
                    <p>{userData?.email}</p>
                </div>
                <div className="flex gap-x-2">
                    <p className="text-[20px] font-bold">Skills</p>
                    <div className="flex gap-x-2 items-center ">
                        {
                            userData?.profile?.skills.map((skill, ind) => (
                                <div className="bg-white border text-[#6A38C2] font-bold text-[15px] rounded-full px-1.5 py-0.5 " key={ind}>{skill}</div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex gap-x-2">
                    <p className="text-[20px] font-bold">Resume</p>
                    <a href={userData?.profile?.resume} target="_blank" className="text-blue-400 underline ">{userData?.profile?.resumeOriginalName}</a>
                </div>
            </div>
            <h1 className="text-[30px] font-bold">Applied Jobs</h1>
            <table className="w-full my-4 ">
                <thead>
                    <tr className="bg-gray-200">
                        <th>Date</th>
                        <th>Role</th>
                        <th>Company</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myJobs.length > 0 && myJobs.map((job,ind) => (
                            <tr className="text-center border my-1 " key={ind}>
                                <td className="py-2">{job.createdAt.split("T")[0]}</td>
                                <td>{job.jobId.title}</td>
                                <td>{job?.jobId?.companyId?.companyName}</td>
                                <td>
                                    <div className={`w-[30%] ml-[30%] capitalize  rounded-md px-3 py-1 font-bold ${job?.status=="pending"?"bg-gray-400 ":job?.status=="accepted"?"bg-green-400":"bg-red-500"}`}>{job.status}</div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                visible && <Modal setVisible={setVisible} />
            }
        </div>
    )
}
export default Profile;