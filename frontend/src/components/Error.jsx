import { Link } from "react-router-dom";
import img1 from "../assets/errorPage.avif";
export const Error=()=>{
    return(
        <div className="max-w-[1100px] mx-auto flex flex-col justify-center items-center ">
            <h1 className="text-[30px] font-bold ">Error page</h1>
            <img src={img1} className="w-[500px]"/>
            <Link to='/'><button className="bg-[#6A38C2] text-white border px-4 font-semibold py-2 cursor-pointer rounded-md">Home</button></Link>
        </div>
    )
}