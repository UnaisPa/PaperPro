import { createSlice } from '@reduxjs/toolkit';

export const completedTradesSlice = createSlice({
    name: 'completedTrades',
    initialState: [],
    reducers: {
        addCompletedTrade: (state, action) => {
            state.push(action.payload);
        },
        setCompletedTrades:(state,action) =>{
            state = action.payload
        }
    },
});

export const { addCompletedTrade } = completedTradesSlice.actions;

export default completedTradesSlice.reducer;
