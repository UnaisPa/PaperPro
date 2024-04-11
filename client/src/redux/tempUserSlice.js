import  {createSlice} from "@reduxjs/toolkit";
const initialState = {
    currentUser:null,
}
const tempUserSlice = createSlice({
    name:'tempUser',
    initialState,
    reducers:{
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload;
        },
    }
})

export const {signInSuccess} = tempUserSlice.actions
export default tempUserSlice.reducer