import { createAsyncThunk } from "@reduxjs/toolkit";

import { Drink } from "../slices/drinkSlice";

export const fetchDrinksData = createAsyncThunk<{ drinks: Array<Drink> }, string, { rejectValue: { error: string } }>(
  "drinks/fetchDrinksData",
  async (searchTerm: string, thunkAPI) => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const fetchDrinkDetails = createAsyncThunk<{ drinks: Array<Drink> }, string, { rejectValue: { error: string } }>(
  "drinks/fetchDrinkDetails",
  async (id: string, thunkAPI) => {
    try {
      console.log("id here", id);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);
