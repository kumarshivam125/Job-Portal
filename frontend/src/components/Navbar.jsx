import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { setToken, setUser } from "@/redux/userSlice";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { FaRegUserCircle } from "react-icons/fa";
import { setAllCompanies } from "@/redux/companySlice";

const Navbar = () => {
    const { token, userData } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function logoutHandler() {
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(setAllCompanies(null));
        toast.success("Logged Out Successfully");
        navigate("/login");
    }
    return (
        <div className='max-w-[1100px] mx-auto  py-[20px] flex justify-between'>
            <p className="font-bold text-[20px] cursor-pointer">Job<span className="text-[#6A38C2]">Hunt</span></p>
            {
                token ?
                    <div className="flex gap-x-[15px] items-center">
                        {
                            userData?.role === "recruiter" ?
                                <>
                                    <Link to='/admin/companies'><p className="font-bold">Companies</p></Link>
                                    <Link to='/admin/jobs'><p className="font-bold">Jobs</p></Link>
                                </>
                                :
                                <>
                                    <Link to='/'><p className="font-bold">Home</p></Link>
                                    <Link to='/jobs'><p className="font-bold">Jobs</p></Link>
                                    <Link to='/browse'><p className="font-bold">Browse</p></Link>
                                </>
                        }
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={userData?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-50">
                                <div className='cursor-pointer hover:bg-gray-100 duration-150 p-1 rounded-md flex items-center gap-x-1 '>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={userData?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                    <p>{userData?.fullName}</p>
                                </div>
                                {
                                    userData?.role === "student" &&
                                    <Link to='/profile'><p className="underline ml-[20%] ">Profile</p></Link>
                                }
                                <button className="bg-[#6A38C2] text-white border px-4 font-semibold py-2 cursor-pointer rounded-md my-2 ml-[20%]  "
                                    onClick={logoutHandler}>Logout</button>
                            </PopoverContent>
                        </Popover>
                    </div>
                    :
                    <div className="flex gap-x-[15px]">
                        <Link to='/signup'><button className="bg-gray-50 border px-4 font-semibold py-2 cursor-pointer rounded-md">Signup</button></Link>
                        <Link to='/login'><button className="bg-[#6A38C2] text-white border px-4 font-semibold py-2 cursor-pointer rounded-md">Login</button></Link>
                    </div>
            }
        </div>
    )
}
export default Navbar;