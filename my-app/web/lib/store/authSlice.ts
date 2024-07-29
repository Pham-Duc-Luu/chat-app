import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
export interface IAuthState {
  counter: number;
}

const initialState: IAuthState = {
  counter: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCounter: (state, action: PayloadAction<number>) => {
      state.counter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(countAndResetOTP.fulfilled, (state) => {
      state.counter = 0; // Reset counter after the task is complete
    });
  },
});

// Create an async thunk to count from 0 to 60 and then set isSentOTP to false
export const countAndResetOTP = createAsyncThunk(
  'auth/countAndResetOTP',
  async (email: string, { dispatch }) => {
    for (let i = 0; i <= 60; i++) {
      dispatch(setCounter(i));
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
    }
  }
);

export const { setCounter } = authSlice.actions;
export const authReducer = authSlice.reducer;
