import { TUser } from '@utils-types';
import { AppDispatch } from '../store';
import { deleteCookie, getCookie, setCookie } from 'src/utils/cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  updateUserApi,
  TRegisterData,
  registerUserApi
} from '@api';

export type TError = {
  success: boolean;
  message: string;
} | null;

export type TUserState = {
  isAuthChecked: boolean;
  data: TUser | null;
  registerErr: unknown;
  registerReq: boolean;
  loginErr: TError;
  loginReq: boolean;
  updateErr: unknown;
  updateReq: boolean;
  getErr: unknown;
  getReq: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  registerErr: null,
  registerReq: false,
  loginErr: null,
  loginReq: false,
  updateErr: null,
  updateReq: false,
  getErr: null,
  getReq: false
};

export const getUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, name }: TRegisterData) => {
    const res = await registerUserApi({ email, password, name });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const res = await loginUserApi({ email, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.getReq = true;
        state.getErr = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.registerReq = true;
        state.registerErr = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginReq = true;
        state.loginErr = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateReq = true;
        state.updateErr = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.getReq = false;
        state.data = payload.user;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.registerReq = false;
        state.data = payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loginReq = false;
        state.data = payload;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.updateReq = false;
        state.data = payload.user;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.getReq = false;
        state.getErr = error;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.registerReq = false;
        state.registerErr = error;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.loginReq = false;
        state.loginErr = error as TError;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.updateReq = false;
        state.updateErr = error;
      });
  }
});

export const checkUserAuth = () => (dispatch: AppDispatch) => {
  if (getCookie('accessToken')) {
    dispatch(getUser()).finally(() => {
      dispatch(userSlice.actions.authChecked());
    });
  } else {
    dispatch(userSlice.actions.authChecked());
  }
};

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    await logoutApi();
    localStorage.clear();
    deleteCookie('accessToken');
    dispatch(userSlice.actions.logout());
  }
);

export const userReducer = userSlice.reducer;
export const { authChecked, logout } = userSlice.actions;
