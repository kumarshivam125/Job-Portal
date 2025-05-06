import { setLoading } from "@/redux/userSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { setCompanyDetails } from "@/redux/companySlice";
const UpdateCompany = () => {
    const { companyDetails } = useSelector(state => state.company);
    const [data, setData] = useState({
        companyName: ".",
        description: ".",
        website: ".",
    })
    const { loading } = useSelector(state => state.user);
    const params = useParams();
    const dispatch = useDispatch();
    const myInputRef = useRef();
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("companyName", data.companyName);
        formData.append("companyId", params?.id);
        formData.append("description", data.description);
        formData.append("website", data.website);
        if (file)
            formData.append("logo", file);
        try {
            dispatch(setLoading(true));
            const resp = await axios.post("http://localhost:4000/api/v1/company/updateCompany", formData);
            console.log(resp.data);
            navigate("/admin/companies");

            toast.success("Company Details Updated");
        }
        catch (err) {
            toast.error(err?.response?.data?.message)
            console.log("Error in front--", err.response);
        }
        dispatch(setLoading(false));
    }
    const changeHandler = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const uploadButtonHandler = () => {
        myInputRef.current.click();
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`http://localhost:4000/api/v1/company/getCompanyById/${params?.id}`);
                console.log("Company Details Fetched At render--", resp.data)
                dispatch(setCompanyDetails(resp.data?.companyDetails));
            }
            catch (err) {
                toast.error(err?.response?.data?.message)
                console.log("Error in front--", err.response);
            }
        }
        fetchData();
        return () => dispatch(setCompanyDetails(null));
    }, [])
    useEffect(() => {
        setData({
            companyName: companyDetails?.companyName,
            description: companyDetails?.description,
            website: companyDetails?.website,
        })
    }, [companyDetails])
    return (
        <div className='max-w-[1100px] mx-auto mt-11 '>
            <div className="flex justify-center">
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col gap-y-3  min-w-[500px] bg-gray-50   border rounded-md px-5 py-4  ">
                        <div className="flex items-center text-[30px] gap-x-3">
                            <IoMdArrowRoundBack className="cursor-pointer" onClick={() => navigate('/admin/companies')} />
                            <h1 className="font-bold">Company Details</h1>
                        </div>
                        <div className="flex gap-x-2">
                            <p className="font-bold">Company Name</p>
                            <input type='text' onChange={changeHandler} name='companyName' className="outline w-[70%] p-1"
                                defaultValue={companyDetails?.companyName} value={data.companyName}
                            />
                        </div>
                        <div className="flex gap-x-2">
                            <p className="font-bold">Description</p>
                            <input type='text' onChange={changeHandler} name='description' className="outline w-[70%] p-1" value={data.description} />
                        </div>
                        <div className="flex gap-x-2">
                            <p className="font-bold">Website</p>
                            <input type='text' onChange={changeHandler} name='website' className="outline w-[70%] p-1" value={data.website} />
                        </div>

                        <div className="flex gap-x-2">
                            <p className="font-bold">Logo</p>
                            <input type='file' onChange={(e) => setFile(e.target.files[0])} name='fullName' accept="image/*" className=""
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
                            }</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UpdateCompany;