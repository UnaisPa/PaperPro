import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    chatBox:[],
    currentChatId:undefined,
    currentReciever:{},
    unreadCount:0
}

const chatSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        setChatBox:(state,action) =>{
            return action.payload
        },
        addChatBox:(state,action)=>{
            state.chatBox.push(action.payload);
        },
        setCurrentChatId:(state,action) =>{
            state.currentChatId = action.payload
        },
        setCurrentReciever:(state,action)=>{
            state.currentReciever = action.payload
        },
        incrementUnreadCount:(state,action)=>{
            state.unreadCount = action.payload
        },
        setUnreadCount:(state)=>{
            state.unreadCount = 0;
        }
    }
})

export const {addChatBox,setCurrentChatId,setChatBox,setCurrentReciever,incrementUnreadCount,setUnreadCount} = chatSlice.actions;
export default chatSlice.reducer