// import { IoIosMore } from "react-icons/io";
// import { CiEdit } from "react-icons/ci";
// import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllCompanies } from "@/redux/companySlice";
import { useNavigate } from "react-router-dom";
const Companies = () => {
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allCompany } = useSelector(state => state.company);
    useEffect(() => {
        const fetchComapnies = async () => {
            try {
                const resp = await axios.get("http://localhost:4000/api/v1/company/getAllCompany", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("All Companies", resp.data)
                dispatch(setAllCompanies(resp.data.allCompany));
            }
            catch (err) {
                console.log("Error while Fetching all Companies", err.message)
            }
        }
        fetchComapnies();
    },[])
    const [tempCompanies, setTempCompanies] = useState(allCompany);
    const [companyFilter, setCompanyFilter] = useState();
    useEffect(() => {
        if (!companyFilter)
            setTempCompanies(allCompany);
        else
            setTempCompanies(allCompany.filter(x => x.companyName.toLowerCase().includes(companyFilter.toLowerCase())));
    }, [companyFilter])
    return (
        <div className="max-w-[1100px] mx-auto mt-11">
            <div className="flex justify-between ">
                <input className="outline " type="text" onChange={(e)=> setCompanyFilter(e.target.value)}/>
                <button className="bg-gray-600   text-white border px-4 font-semibold py-2 cursor-pointer rounded-md"
                    onClick={() => navigate('/admin/companies/create')}>New Company</button>
            </div>
            <div>
                <table className="w-full my-10 ">
                    <thead>
                        <tr className="bg-yellow-400 text-center  ">
                            <th className="text-left pl-1 ">Logo</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tempCompanies && tempCompanies.map((comp) => (
                                <tr className="text-center" key={comp?._id}>
                                    <td ><img src={comp?.logo} className="w-[40px] " /></td>
                                    <td>{comp?.companyName}</td>
                                    <td>{comp?.createdAt?.split("T")[0]}</td>
                                    <td className="font-extrabold cursor-pointer" onClick={() => navigate(`/admin/companies/${comp?._id}`)}>Edit</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Companies;


