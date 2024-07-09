import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { authReducer } from './store/authSlice';
import { userInfoReducer } from './store/userInfoSlice';
import { configReducer } from './store/configSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userInfoReducer,
      config: configReducer,
    },
  });
};

export const store = makeStore();
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
