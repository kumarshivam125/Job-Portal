import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RecuritorPrivateRoute=({children})=>{
    const {token,userData}=useSelector(state=>state.user);
    if(token && userData?.role=='recruiter')
        return children;
    else if(token && userData?.role=='student')
        return <Navigate to='/'/>
    else 
        return <Navigate to='/login'/>
}
export default RecuritorPrivateRoute;