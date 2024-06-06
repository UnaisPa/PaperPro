import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    admin: null,
    posts: [],
    reportedPosts:[],
    totalTrades:[],
    averageProfits:[],
}

const adminSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {
        adminSignInSuccess: (state, action) => {
            state.admin = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = [...state.posts, ...action.payload];
        },
        deletePost:(state,action)=>{
            state.posts = state.posts.filter(post => post._id !== action.payload)
        },
        setReportedPosts:(state,action) =>{
            state.reportedPosts = action.payload
        },
        deleteReportedPost:(state,action) =>{
            state.reportedPosts = state.reportedPosts.filter(post => post._id !== action.payload)
        },
        setTotalTrades:(state,action) =>{
            state.totalTrades = action.payload;  
        },
        setAverageProfits:(state,action)=>{
            state.averageProfits = action.payload
        }
        
    }
})

export const { adminSignInSuccess,deletePost,setPosts,setReportedPosts,deleteReportedPost,setTotalTrades,setAverageProfits } = adminSlice.actions;
export default adminSlice.reducer