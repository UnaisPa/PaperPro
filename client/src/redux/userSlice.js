import  {createSlice} from "@reduxjs/toolkit";
const initialState = {
    user:null,
    loading:false,
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true
        },
        signInSuccess:(state,action)=>{
            state.user = action.payload;
            state.loading = false;
        },
    }
})

export const {signInStart,signInSuccess} = userSlice.actions
export default userSlice.reducer