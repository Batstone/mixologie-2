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

    console.log("URL check", API_NAME_URL, API_INGREDIENT_URL, API_ID_URL);
    console.log("searchType", searchType, "Search Term", searchTerm);

    if (searchType === NAME) {
      url = API_NAME_URL;
    } else if (searchType === INGREDIENT) {
      url = API_INGREDIENT_URL;
    } else if (searchType === ID) {
      url = API_ID_URL;
    }

    console.log(`${url}${searchTerm}`);

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
