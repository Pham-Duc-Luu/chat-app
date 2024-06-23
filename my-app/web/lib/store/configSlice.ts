import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ITheme = "dark" | "light";
export type ILanguage = "en" | "vi";

export interface IConfigState {
  theme: ITheme;
  language: ILanguage;
}

const initialState: IConfigState = {
  theme: "light",
  language: "en",
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ITheme>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<ILanguage>) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = configSlice.actions;
export const configReducer = configSlice.reducer;
