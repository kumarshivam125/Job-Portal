import { createSlice }  from "@reduxjs/toolkit";

const initialState={
    userData:null,
    token:null,
    loading:false
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.userData=action.payload
        },
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
    }
})
export const {setUser,setToken,setLoading}=userSlice.actions;
export default userSlice.reducer;