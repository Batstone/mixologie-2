import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { fetchDrinkData } from '../thunks/fetchDrinkData';

// Define a type for the slice state
interface SearchState {
    value: string
}

const initialState: SearchState = {
    value: ''
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDrinkData.fulfilled,(state, action)=>{
            state.value = action.payload;
        });
    }
})