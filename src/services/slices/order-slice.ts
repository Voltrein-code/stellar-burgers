import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { resetConstructor } from './constructor-slice';

type OrderData = TOrder | null;

export type TOrderState = {
  orderData: OrderData;
  isLoading: boolean;
  error: unknown;
  orderByNumber: OrderData;
  orderByNumberIsLoading: boolean;
  orderByNumberError: unknown;
};

const initialState: TOrderState = {
  orderData: null,
  isLoading: false,
  error: null,
  orderByNumber: null,
  orderByNumberIsLoading: false,
  orderByNumberError: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData: string[], { dispatch }) => {
    dispatch(resetConstructor());
    return (await orderBurgerApi(orderData)).order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderByNumberIsLoading = true;
        state.orderByNumberError = null;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.orderData = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.orderByNumber = payload.orders[0];
        state.orderByNumberIsLoading = false;
        state.orderByNumberError = null;
      })
      .addCase(createOrder.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(getOrderByNumber.rejected, (state, { error }) => {
        state.orderByNumberIsLoading = false;
        state.orderByNumberError = error;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { resetOrder } = orderSlice.actions;
