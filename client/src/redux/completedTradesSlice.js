import { createSlice } from '@reduxjs/toolkit';

export const completedTradesSlice = createSlice({
    name: 'completedTrades',
    initialState: [],
    reducers: {
        addCompletedTrade: (state, action) => {
            state.push(action.payload);
        },
        setCompletedTrades:(state,action) =>{
            return action.payload;
        }
    },
});

export const { addCompletedTrade,setCompletedTrades } = completedTradesSlice.actions;

export default completedTradesSlice.reducer;
