import { createAsyncThunk } from "@reduxjs/toolkit";

import { Drink } from "../slices/drinkSlice";

import { API_NAME_URL, API_INGREDIENT_URL, API_ID_URL, NAME, INGREDIENT, ID } from "@/constants";

export const fetchDrinksData = createAsyncThunk<
  { drinks: Array<Drink> },
  { searchType: string; searchTerm: string },
  { rejectValue: { error: string } }
>("drinks/fetchDrinksData", async ({ searchType, searchTerm }, thunkAPI) => {
  try {
    let url: string | undefined;
    switch (searchType) {
      case NAME:
        url = API_NAME_URL;
        break;
      case INGREDIENT:
        url = API_INGREDIENT_URL;
        break;
      case ID:
        console.log("ID SEARCH THUNK");
        url = API_ID_URL;
        break;
    }
    const response = await fetch(`${url}${searchTerm}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: (error as Error).message });
  }
});

/*
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
*/
