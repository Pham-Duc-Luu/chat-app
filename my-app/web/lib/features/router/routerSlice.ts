import { locales } from "@/i18n";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Locale = (typeof locales)[number];

export interface IRouterState {
  home: ` /${Locale}/home`;
  auth: {
    login: ` /${Locale}/auth/login`;
    signUp: ` /${Locale}/auth/sign-up`;
  };
}

const initialState: IRouterState = {
  home: " /en/home",
  auth: {
    login: " /en/auth/login",
    signUp: " /en/auth/sign-up",
  },
};

export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {},
});

export const routerReducer = routerSlice.reducer;
