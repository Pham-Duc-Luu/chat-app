import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ITheme = 'dark' | 'light' | 'system';
export type ILanguage = 'en' | 'vi';
export type ILayoutOptions = 'Grid Layout' | 'Single Layout';
export type IDensity = 'eco' | 'roomy' | 'cozy';
export interface IConfigState {
  theme: ITheme;
  language: ILanguage;
  layout: ILayoutOptions;
  density: IDensity;
}

const initialState: IConfigState = {
  theme: 'light',
  language: 'en',
  layout: 'Grid Layout',
  density: 'eco',
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ITheme>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<ILanguage>) => {
      state.language = action.payload;
    },
    setState: (state, { payload }: PayloadAction<Partial<IConfigState>>) => {
      state = { ...state, ...payload };
    },
  },
});

export const { setTheme, setLanguage } = configSlice.actions;
export const configReducer = configSlice.reducer;
