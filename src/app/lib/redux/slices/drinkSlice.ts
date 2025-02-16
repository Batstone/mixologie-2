import { createSlice } from "@reduxjs/toolkit";

import { fetchDrinksData, fetchDrinkDetails } from "../thunks/fetchDrinksData";

export interface Drink {
  name: string;
  instructions: string;
  glass: string;
  id: string;
}

// Define a type for the slice state
interface DrinkState {
  data: Drink[];
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
      .addCase(fetchDrinksData.pending, (state) => {
        console.log("loading");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrinksData.fulfilled, (state, action) => {
        console.log("fetch drinksss");
        const drinks: Drink[] = action.payload.drinks.map((drink: any) => ({
          name: drink.strDrink,
          instructions: drink.strInstructions,
          glass: drink.strGlass,
          id: drink.idDrink,
        }));

        console.log("fulfilled");

        state.loading = false;
        state.data = drinks;
        console.log("state", state.data);
      })
      .addCase(fetchDrinksData.rejected, (state, action) => {
        console.log("rejected");

        state.loading = false;
        state.error = action.payload?.error || "Something went wrong";
        console.log("error", state.error);
      })
      .addCase(fetchDrinkDetails.pending, (state) => {
        console.log("details loading");
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDrinkDetails.fulfilled, (state, action) => {
        console.log("details fulfilled");
        const drinks: Drink[] = action.payload.drinks.map((drink: any) => ({
          name: drink.strDrink,
          instructions: drink.strInstructions,
          glass: drink.strGlass,
          id: drink.idDrink,
        }));

        state.loading = false;
        state.data = drinks;
        console.log("state", state.data);
      })
      .addCase(fetchDrinkDetails.rejected, (state, action) => {
        console.log("details rejected");

        state.loading = false;
        state.error = action.payload?.error || "Something went wrong";
        console.log("error", state.error);
      });
  },
});

export { fetchDrinksData };
