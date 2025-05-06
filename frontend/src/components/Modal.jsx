import { setLoading, setUser } from "@/redux/userSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
const Modal = ({ setVisible }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        bio: "",
        skills: "",
    })
    const { loading,token } = useSelector(state => state.user);
    const myInputRef = useRef();
    const dispatch=useDispatch();
    const [file, setFile] = useState();
    const submitHandler = async (e) => {
        e.preventDefault();
        const finalData = new FormData();
        finalData.append("fullName", formData.fullName);
        finalData.append("bio", formData.bio);
        finalData.append("skills", formData.skills);
        finalData.append("resume", file);
        console.log("USE STATE ",formData);
        try {
            dispatch(setLoading(true));
            const resp = await axios.post("http://localhost:4000/api/v1/user/updateProfile", finalData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            console.log("Update Profile Response--", resp)
            toast.success("Details Updated Successfully");
            dispatch(setUser(resp?.data?.user));
            setVisible(false);
        }
        catch (err) {
            toast.error(err?.response?.data?.message)
            console.log("Error in Updating Profile--", err.response);
        }
        dispatch(setLoading(false));
    }
    const changeHandler = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const uploadButtonHandler = () => {
        myInputRef.current.click();
    }
    return (
        <div className="h-screen w-screen bg-white backdrop-opacity-65 fixed  top-0 left-0 flex justify-center">
            <form onSubmit={submitHandler}>
                <div className="flex flex-col gap-y-3  w-[500px] bg-gray-50  h-  border rounded-md px-5 py-4 my-10  ">
                    <div className="flex gap-x-2">
                        <p className="font-bold">Full Name</p>
                        <input type='text' onChange={changeHandler} name='fullName' className="outline w-[70%] p-1" value={formData.fullName} />
                    </div>
                    <div className="flex gap-x-2">
                        <p className="font-bold">Bio</p>
                        <input type='text' onChange={changeHandler} name='bio' className="outline w-[70%] p-1" value={formData.bio} />
                    </div>
                    <div className="flex gap-x-2">
                        <p className="font-bold">Skills</p>
                        <input type='text' onChange={changeHandler} name='skills' className="outline w-[70%] p-1" value={formData.skills} />
                    </div>
                    <div className="flex gap-x-2">
                        <p className="font-bold">Resume</p>
                        <input type='file' onChange={(e) => setFile(e.target.files[0])} name='fullName' accept="application/pdf" className=""
                            ref={myInputRef} style={{ display: "none" }} />
                        <button type="button" className="bg-gray-300 border p-1 px-2 text-black font-medium  cursor-pointer rounded-md"
                            onClick={uploadButtonHandler}>select File</button>
                        <p className="text-red-500 font-medium ">{file?.name ?? ""}</p>
                    </div>
                    <button type="submit" disabled={loading} className="bg-black text-white border font-semibold py-1.5 cursor-pointer rounded-md">
                        {
                            loading ?
                                <div className="flex justify-center gap-x-1">
                                    <Loader2 className="animate-spin" />
                                    <p>Please Wait</p>
                                </div>
                                : "Update"
                        }
                    </button>
                </div>
            </form>
            <IoClose className="text-[50px] cursor-pointer" onClick={() => setVisible(false)} />
        </div>
    )
}
export default Modal;