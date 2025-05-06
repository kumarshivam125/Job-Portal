import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const StudentPrivateRoute=({children})=>{
    const {token,userData}=useSelector(state=>state.user);
    if(token && userData?.role=='student')
        return children;
    else if(token && userData?.role=='recruiter')
        return <Navigate to='/admin/companies'/>
    else 
        return <Navigate to='/login'/>
}
export default StudentPrivateRoute;