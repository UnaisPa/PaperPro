import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    admin: null,
    posts: [],
    reportedPosts:[]
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
        }
        
    }
})

export const { adminSignInSuccess,deletePost,setPosts,setReportedPosts,deleteReportedPost } = adminSlice.actions;
export default adminSlice.reducer