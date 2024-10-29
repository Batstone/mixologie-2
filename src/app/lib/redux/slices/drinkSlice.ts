import { createSlice } from "@reduxjs/toolkit";

import { fetchDrinkData } from "../thunks/fetchDrinkData";

interface Drink {
  name: string;
  instructions: string;
  glass: string;
}

// Define a type for the slice state
interface DrinkState {
  data: Array<Drink>;
  loading: boolean;
  error: string | null;
  selectedDrink: Drink | null;
}

const initialState: DrinkState = {
  data: [],
  loading: false,
  error: null,
  selectedDrink: null,
};

export const drinkSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setDrinkData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinkData.pending, (state) => {
        console.log("loading");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrinkData.fulfilled, (state, action) => {
        const drinks: Drink[] = action.payload.drinks.map((drink: any) => ({
          name: drink.strDrink,
          instructions: drink.strInstructions,
          glass: drink.strGlass,
        }));

        console.log("fulfilled");

        state.loading = false;
        state.data = drinks;
        console.log("state", state.data);
      })
      .addCase(fetchDrinkData.rejected, (state, action) => {
        console.log("rejected");

        state.loading = false;
        state.error = action.payload?.error || "Something went wrong";
      });
  },
});

export { fetchDrinkData };
