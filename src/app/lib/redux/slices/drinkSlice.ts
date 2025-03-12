import { createSlice } from "@reduxjs/toolkit";

import { fetchDrinksData } from "../thunks/fetchDrinksData";

import { SEARCH, INGREDIENTS_TYPE, INGREDIENTS_AMOUNT } from "@/constants";

export interface Drink {
  name: string;
  instructions: string;
  glass: string;
  id: string;
  img: string;
  ingredients: string[];
  ingredientsAmount: string[];
}

// Define a type for the slice state
interface DrinkSearchState {
  data: Drink[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
}

const initialState: DrinkSearchState = {
  data: [],
  searchTerm: "",
  loading: false,
  error: null,
};

export const drinkSlice = createSlice({
  name: SEARCH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinksData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrinksData.fulfilled, (state, action) => {
        const drinks: Drink[] = action.payload.drinks.map((drink: any) => {
          const ingredients = Object.keys(drink)
            .filter((key) => key.startsWith(INGREDIENTS_TYPE) && drink[key] !== null)
            .map((key) => drink[key]);
          const ingredientsAmount = Object.keys(drink)
            .filter((key) => key.startsWith(INGREDIENTS_AMOUNT) && drink[key] !== null)
            .map((key) => drink[key]);

          return {
            name: drink.strDrink,
            instructions: drink.strInstructions,
            glass: drink.strGlass,
            id: drink.idDrink,
            img: drink.strDrinkThumb,
            ingredients,
            ingredientsAmount,
          };
        });

        state.loading = false;
        state.data = drinks;
        state.searchTerm = action.payload.searchTerm;
      })
      .addCase(fetchDrinksData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Something went wrong";
        console.log("error", state.error);
      });
  },
});

export { fetchDrinksData };
