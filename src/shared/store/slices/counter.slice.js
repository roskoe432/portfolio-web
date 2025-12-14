import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	count: 0,
};

const MAX_COUNT = 1000;
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.count = clamp(state.count + 1, 0, MAX_COUNT);
		},
		decrement: (state) => {
			state.count = clamp(state.count - 1, 0, MAX_COUNT);
		},
		reset: (state) => {
			state.count = 0;
		},
	},
});

export const selectCount = (state) => state.counter.count;

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
