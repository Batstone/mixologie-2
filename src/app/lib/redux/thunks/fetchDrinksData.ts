import { createAsyncThunk } from "@reduxjs/toolkit";

import { Drink } from "../slices/drinkSlice";

import { API_NAME_URL, API_INGREDIENT_URL, API_ID_URL, NAME, INGREDIENT, ID } from "@/constants";
import { Tenali_Ramakrishna } from "next/font/google";

export const fetchDrinksData = createAsyncThunk<
  { drinks: Array<Drink>; searchTerm: string },
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
        url = API_ID_URL;
        break;
    }
    const response = await fetch(`${url}${searchTerm}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();

    if (!data.drinks) {
      throw new Error("No drinks were found. Try searching again.");
    }

    return {
      drinks: data.drinks,
      searchTerm,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: (error as Error).message });
  }
});
