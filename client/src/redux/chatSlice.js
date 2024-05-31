import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    chatBox:[],
    currentChatId:undefined,
    currentReciever:{}
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
        }
    }
})

export const {addChatBox,setCurrentChatId,setChatBox,setCurrentReciever} = chatSlice.actions;
export default chatSlice.reducer