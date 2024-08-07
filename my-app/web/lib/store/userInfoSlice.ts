import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import auth from '../api/auth.api';
import { AxiosError } from 'axios';
import { HttpResponse } from '@/util/httpResponse';
import dummyjson from '@/test/DummyJSON';
import { message } from 'antd';

export interface IUserInfo {
  id?: number;
  username?: string;
  email?: string;
  avatar?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  accessToken?: string;
  refreshToken?: string;
}

const initialState: {
  status: 'idle' | 'loading' | 'failed' | 'completed';
  message?: string;
  entities: {
    userinfo: IUserInfo;
  };
} = {
  status: 'idle',
  entities: {
    userinfo: {},
  },
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: ({ entities }, action: PayloadAction<IUserInfo>) => {
      entities.userinfo = action.payload;
    },
    removeUserInfo: (state) => {
      state.entities.userinfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload && action.payload?.statusCode < 400) {
          state.status = 'completed';
          const data = action.payload?.data;
          state.entities.userinfo = {
            ...data?.user,
            accessToken: data?.token?.access_token,
            refreshToken: data?.token?.refresh_token,
          };
        } else {
          state.status = 'failed';
          state.message = action.payload?.message;
        }
      })
      .addCase(signUp.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (action.payload && action.payload?.statusCode < 400) {
          state.status = 'completed';
          const data = action.payload?.data;
          state.entities.userinfo = {
            ...data?.user,
            accessToken: data?.token?.access_token,
            refreshToken: data?.token?.refresh_token,
          };
        } else {
          state.status = 'failed';
          state.message = action.payload?.message;
        }
      })
      .addCase(googleoauth.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(googleoauth.fulfilled, (state, action) => {
        if (action.payload && action.payload?.statusCode < 400) {
          state.status = 'completed';
          const data = action.payload?.data;
          state.entities.userinfo = {
            ...data?.user,
            accessToken: data?.token?.access_token,
            refreshToken: data?.token?.refresh_token,
          };
        } else {
          state.status = 'failed';
          state.message = action.payload?.message;
        }
      });
  },
});
export const signIn = createAsyncThunk(
  'sign-in',
  async (values: Parameters<typeof auth.signIn>[0]) => {
    try {
      type returnValue = Awaited<ReturnType<typeof auth.signIn>>['data'];

      // * mock data for debugging purposes
      if (process.env.NODE_ENV === 'development') {
        const testData = (await dummyjson.user.getUserById()).data;

        const res: returnValue = new HttpResponse('oke', 200, {
          token: {
            refresh_token: 'refresh_token',
            access_token: 'access_token',
          },
          user: {
            id: testData.id,
            username: testData.username,
            email: testData.email,
            avatar: testData.image,
            phoneNumber: testData.phone,
            firstName: testData.firstName,
            lastName: testData.lastName,
          },
        });

        return res;
      }
      const { data } = await auth.signIn(values);

      return data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<HttpResponse>;
        return err.response?.data;
      }
    }
  }
);

export const signUp = createAsyncThunk(
  'sign-up',
  async (values: Parameters<typeof auth.signUp>[0]) => {
    try {
      const response = await auth.signUp(values);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error instanceof AxiosError) {
        const err = error as AxiosError<HttpResponse>;
        return err.response?.data;
      }
    }
  }
);

export const googleoauth = createAsyncThunk('google-oauth', async () => {
  try {
    const response = await auth.GoogleOAuth();
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error instanceof AxiosError) {
      const err = error as AxiosError<HttpResponse>;
      return err.response?.data;
    }
  }
});
export const { setUserInfo, removeUserInfo } = userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;
