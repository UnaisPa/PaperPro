import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    posts:[], // All Posts
    //userPosts:[] // Specifc user posts
}

const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        setPosts:(state,action)=>{
            state.posts = action.payload
        },
        addPost:(state,action)=>{
            state.posts = [action.payload, ...state.posts]
        },
        updatePost:(state,action)=>{
            state.posts = state.posts.map((post) =>
                post._id === action.payload._id ? action.payload : post
            );   
        },
        deletePost:(state,action)=>{
            state.posts = state.posts.filter(post => post._id !== action.payload)
        }
    }
})

export const {setPosts,addPost,updatePost,deletePost} = postSlice.actions
export default postSlice.reducer