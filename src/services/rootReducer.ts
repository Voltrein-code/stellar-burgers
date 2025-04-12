import { combineReducers } from '@reduxjs/toolkit';
import { constructorReducer } from './slices/constructor-slice';
import { feedReducer } from './slices/feed-slice';
import { ingredientsReducer } from './slices/ingredients-slice';
import { userReducer } from './slices/user-slice';
import { orderReducer } from './slices/order-slice';
import { ordersListReducer } from './slices/orders-list-slice';

const rootReducer = combineReducers({
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  user: userReducer,
  order: orderReducer,
  orders: ordersListReducer
});

export default rootReducer;
