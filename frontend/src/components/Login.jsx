import { setLoading, setToken, setUser } from "@/redux/userSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const dispatch=useDispatch();
    const {loading}=useSelector(state=>state.user);
    const navigate=useNavigate();
    const {userData,token}=useSelector(state=>state.user);
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData=new FormData();  
        formData.append("email",data.email);
        formData.append("password",data.password);
        try{
            dispatch(setLoading(true));
            const resp=await axios.post("http://localhost:4000/api/v1/user/login",formData);
            console.log(resp);
            dispatch(setUser(resp.data.user1));
            dispatch(setToken(resp.data.token));
            toast.success("Logged in Successfully");
        }
        catch(err){
            toast.error(err?.response?.data?.message)
            console.log("Error in Login --",err.response);
        } 
        dispatch(setLoading(false));  
    }
    const changeHandler = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    useEffect(()=>{
        console.log("USER REDUX data--",userData)
        console.log("TOKEN REDUX --",token)
        if(userData?.role=="recruiter"){
            navigate("/admin/companies");
        }
        else if(userData?.role=="student")
            navigate("/");
    },[userData])
    return (
        <div className='max-w-[1100px] mx-auto mt-11'>
            <div className="flex justify-center">
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col gap-y-3  min-w-[500px] bg-gray-50   border rounded-md px-5 py-4  ">  
                        <div className="flex gap-x-2">
                            <p className="font-bold">Email</p>
                            <input type='email' onChange={changeHandler} name='email' className="outline w-[70%] p-1" value={data.email} />
                        </div>
                        <div className="flex gap-x-2">
                            <p className="font-bold">Password</p>
                            <input type='password' onChange={changeHandler} name='password' className="outline w-[70%] p-1" value={data.password} />
                        </div>
                        <button type="submit" disabled={loading} className="bg-black text-white border font-semibold py-1.5 cursor-pointer rounded-md">
                        {
                            loading?
                                <div className="flex justify-center gap-x-1">
                                    <Loader2 className="animate-spin"/>
                                    <p>Please Wait</p>
                                </div>
                            :"Login"
                        }</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;