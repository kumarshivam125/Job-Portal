import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CreateCompany = () => {
    const [name,setName]=useState("");
    const navigate=useNavigate();
    const {token}=useSelector(state=>state.user);
    async function createCompanyHandler(){
        if(name==""){
            toast.error("Please Fill company Name");
            return;
        }
        console.log(name);
        // console.log("Token",token);
        try {
            const resp = await axios.post("http://localhost:4000/api/v1/company/createCompany", {companyName:name},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Creating Companies", resp.data?.newCompany);
            navigate(`/admin/companies/${resp.data?.newCompany?._id}`);
        }
        catch (err) {
            console.log("Error while Creating Company", err.message);
            toast.error(err?.response?.data?.message);
        }
        
    }
    return (
        <div className="max-w-[1100px] mx-auto ">
            <div className="flex justify-center">
                <div className="w-[500px] ">
                    <h1 className="font-bold text-[30px]">Your Company Name</h1>
                    <p className="text-[20px] text-gray-600 font-semibold ">Give a Name To Regsiter Your Company</p>
                    <p className="mt-5 font-bold  ">Company Name</p>
                    <input type="text" className="outline p-2 my-2 " value={name} onChange={(e)=>setName(e.target.value)} />
                    <div className="flex gap-x-2 ">
                        <button className="outline bg-gray-100  border px-4 font-semibold py-2 cursor-pointer rounded-md"
                            onClick={() => navigate('/admin/companies')}>Cancel</button>
                        <button className="bg-gray-600   text-white border px-4 font-semibold py-2 cursor-pointer rounded-md"
                            onClick={createCompanyHandler}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateCompany;
