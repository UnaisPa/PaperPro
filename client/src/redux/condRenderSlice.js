import  {createSlice} from "@reduxjs/toolkit";
const initialState = {
    registerPage:true,
}
const condRender = createSlice({
    name:'condRender',
    initialState,
    reducers:{
        changeToVerification:(state)=>{
            state.registerPage = false;
        },
        changeToRegister:(state)=>{
            state.registerPage = true;
        }
    }
})

export const {changeToVerification,changeToRegister} = condRender.actions
export default condRender.reducer