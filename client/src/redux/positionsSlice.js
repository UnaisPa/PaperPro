import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    trades:[]
}
export const positionsSlice = createSlice({
    name: 'positions',
    initialState:[],
    reducers: {
        addTrade: (state, action) => {
            state.push(action.payload);
        },
        removeTrade: (state, action) => {
            return state.filter(trade => trade._id !== action.payload._id);
        },
        updateTrade: (state, action) => {
            const index = state.trades.findIndex(trade => trade.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        setPositions: (state, action) => {
            return action.payload;
        },
        updatePositionField: (state, action) => {
            const { id, field, value } = action.payload;
            const position = state.find(position => position._id === id)
            if (position) {
                position[field] = value;
            }
        },
    },
});

export const { addTrade, removeTrade, updateTrade,setPositions,updatePositionField } = positionsSlice.actions;

export default positionsSlice.reducer;
