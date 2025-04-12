import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: unknown;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  isLoading: false
};

export const getFeeds = createAsyncThunk('feeds/getFeeds', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, { payload }) => {
        const { orders, total, totalToday } = payload;
        state.isLoading = false;
        state.orders = orders;
        state.total = total;
        state.totalToday = totalToday;
      })
      .addCase(getFeeds.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      });
  }
});

export const feedReducer = feedSlice.reducer;
