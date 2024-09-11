import { createSlice } from '@reduxjs/toolkit'

import { fetchDrinkData } from '../thunks/fetchDrinkData';

// Define a type for the slice state
interface SearchState {
    data: Array<any>
    loading: boolean
    error: string | null
}

const initialState: SearchState = {
    data: [],
    loading: false,
    error: null
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchDrinkData.pending, (state) => {
            console.log('loading')
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchDrinkData.fulfilled, (state, action) => {
            console.log('fulfilled')

            state.loading = false;
            state.data = action.payload.drinks;
            console.log('state', state.data)
          })
          .addCase(fetchDrinkData.rejected, (state, action) => {
            console.log('rejected')

            state.loading = false;
            state.error = action.payload?.error || 'Something went wrong';
          });
    }
})
export { fetchDrinkData };

