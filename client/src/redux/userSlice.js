import  {createSlice} from "@reduxjs/toolkit";
const initialState = {
    currentUser:null,
    loading:false,
    userIdForGettingTrades:''
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true
        },
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
        },
        signInFailure:(state) =>{
            state.loading = false
        },
        setProfile:(state,action)=>{
            state.currentUser = action.payload
        },
        updateFollowList:(state,action) =>{
            state.currentUser.following = [...state.currentUser.following,action.payload]
        },
        updateFollowListMinus:(state,action) =>{
            state.currentUser.following = state.currentUser.following.filter(userId => userId !== action.payload);
        },
        updateMargin :(state,action) =>{
            state.currentUser.margin = action.payload
        },
        setUserIdForGettingTrades:(state,action) =>{
            state.userIdForGettingTrades = action.payload
        }
    
    }
})

export const {signInStart,signInSuccess,signInFailure,setProfile,updateFollowList,updateFollowListMinus,updateMargin,setUserIdForGettingTrades} = userSlice.actions
export default userSlice.reducer