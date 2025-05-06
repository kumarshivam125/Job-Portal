import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allCompany:[],
    companyDetails:null
}
const companySlice=createSlice({
    name:"company",
    initialState,
    reducers:{
        setAllCompanies:(state,action)=>{
            state.allCompany=action.payload
        },
        setCompanyDetails:(state,action)=>{
            state.companyDetails=action.payload
        },
    }
})
export const {setAllCompanies,setCompanyDetails}=companySlice.actions;
export default companySlice.reducer;