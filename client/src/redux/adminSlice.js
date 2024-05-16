import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    admin:null
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        adminSignInSuccess:(state,action)=>{
            state.admin = action.payload;
        }
    }
})

export const {adminSignInSuccess} = adminSlice.actions;
export default adminSlice.reducer