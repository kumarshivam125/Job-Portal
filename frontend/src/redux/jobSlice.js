import { createSlice }  from "@reduxjs/toolkit";
const initialState={
    allJobs:[],
    adminJobs:[],
    jobFilter:null,
    filteredJobs:[],
    searchJobText:null
}

const jobSlice=createSlice({
    name:"job",
    initialState,
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload
        },
        setAdminJobs:(state,action)=>{
            state.adminJobs=action.payload
        },
        setJobFilter:(state,action)=>{
            state.jobFilter=action.payload
        },
        setFilterdJobs:(state,action)=>{
            state.filteredJobs=action.payload
        },
        setSearchJobText:(state,action)=>{
            state.searchJobText=action.payload
        },
    }
})
export const {setAllJobs,setAdminJobs,setJobFilter,setFilterdJobs,setSearchJobText}=jobSlice.actions;
export default jobSlice.reducer;