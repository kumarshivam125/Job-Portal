import { setLoading } from "@/redux/userSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: ""
    })
    const dispatch=useDispatch();
    const {loading}=useSelector(state=>state.user);
    const myInputRef = useRef();
    const [file, setFile] = useState();
    const navigate=useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData=new FormData();
        formData.append("fullName",data.fullName);
        formData.append("email",data.email);
        formData.append("password",data.password);
        formData.append("role",data.role);
        formData.append("img",file);
        try{
            dispatch(setLoading(true));
            const resp=await axios.post("http://localhost:4000/api/v1/user/signup",formData);
            console.log(resp)
            toast.success("Account Created Successfully");
            navigate("/login")
        }
        catch(err){
            toast.error(err?.response?.data?.message)
            console.log("Error in front--",err.response);
        } 
        dispatch(setLoading(false));  
    }
    const changeHandler = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const uploadButtonHandler = () => {
        myInputRef.current.click();
    }
    return (
        <div className='max-w-[1100px] mx-auto mt-11 '>
            <div className="flex justify-center">
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col gap-y-3  min-w-[500px] bg-gray-50   border rounded-md px-5 py-4  ">
                        <div className="flex gap-x-2">
                            <p className="font-bold">Full Name</p>
                            <input type='text' onChange={changeHandler} name='fullName' className="outline w-[70%] p-1" value={data.fullName} />
                        </div>
                        <div className="flex gap-x-2">
                            <p className="font-bold">Email</p>
                            <input type='email' onChange={changeHandler} name='email' className="outline w-[70%] p-1" value={data.email} />
                        </div>
                        <div className="flex gap-x-2">
                            <p className="font-bold">Password</p>
                            <input type='password' onChange={changeHandler} name='password' className="outline w-[70%] p-1" value={data.password} />
                        </div>
                        <div className="">
                            <p className="font-bold">Account Type</p>
                            <div className="flex gap-x-3 ">
                                <div className="flex gap-x-2">
                                    <input type="radio" id="student" name="role" value="student" onChange={changeHandler} />
                                    <label htmlFor="student">Student</label>
                                </div>
                                <div className="flex gap-x-2">
                                    <input type="radio" id="recruiter" name="role" value="recruiter"  onChange={changeHandler} />
                                    <label htmlFor="recruiter">Recruiter</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-x-2">
                            <p className="font-bold">Profile Photo</p>
                            <input type='file' onChange={(e) => setFile(e.target.files[0]) } name='fullName' accept="image/*" className=""
                                ref={myInputRef} style={{ display: "none" }} />
                            <button type="button" className="bg-gray-300 border p-1 px-2 text-black font-medium  cursor-pointer rounded-md"
                                onClick={uploadButtonHandler}>select File</button>
                            <p className="text-red-500 font-medium ">{file?.name ?? ""}</p>
                        </div>
                        <button type="submit" disabled={loading} className="bg-black text-white border font-semibold py-1.5 cursor-pointer rounded-md">
                        {
                            loading?
                                <div className="flex justify-center gap-x-1">
                                    <Loader2 className="animate-spin"/>
                                    <p>Please Wait</p>
                                </div>
                            :"Signup"
                        }</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Signup;