import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
export interface IAuthState {
  isOPTCreated: boolean;
  counter: number;
}

const initialState: IAuthState = {
  isOPTCreated: false,
  counter: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setisOPTCreated: (state, action: PayloadAction<boolean>) => {
      state.isOPTCreated = true;
    },
    setCounter: (state, action: PayloadAction<number>) => {
      state.counter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.isOPTCreated = true;
      })
      .addCase(countAndResetOTP.fulfilled, (state) => {
        state.counter = 0; // Reset counter after the task is complete
        state.isOPTCreated = false;
      });
  },
});

export const sendOTP = createAsyncThunk('sendOTP', async (email: string) => {
  try {
    // send OTP to the user

    // simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  } catch (error) {}
});

// Create an async thunk to count from 0 to 60 and then set isSentOTP to false
export const countAndResetOTP = createAsyncThunk(
  'auth/countAndResetOTP',
  async (email: string, { dispatch }) => {
    dispatch(sendOTP(email));
    for (let i = 0; i <= 60; i++) {
      dispatch(setCounter(i));
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
    }
  }
);

export const { setCounter, setisOPTCreated } = authSlice.actions;
export const authReducer = authSlice.reducer;
