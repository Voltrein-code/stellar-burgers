import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrdersListState = {
  data: TOrder[];
  isLoading: boolean;
  error: unknown;
};

const initialState: TOrdersListState = {
  data: [],
  isLoading: false,
  error: null
};

export const getOrdersList = createAsyncThunk('orders/getOrders', getOrdersApi);

export const ordersListSlice = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrdersList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(getOrdersList.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      });
  }
});

export const ordersListReducer = ordersListSlice.reducer;
