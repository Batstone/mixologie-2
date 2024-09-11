import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDrinkData = createAsyncThunk<
  { drinks: Array<any> },
  string, 
  { rejectValue: { error: string } }
>("drinks/fetchDrinkData", async (searchTerm: string, thunkAPI) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: (error as Error).message });  }
});
