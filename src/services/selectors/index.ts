import { RootState } from '../store';

// constructor
export const constructorSelector = (rs: RootState) => rs.burgerConstructor;
// ---

// ingredients
export const ingredientsDataSelector = (rs: RootState) => rs.ingredients.data;
// ---

// feed
export const feedSelector = (rs: RootState) => rs.feed;
export const feedOrdersSelector = (rs: RootState) => rs.feed.orders;
// ---

// order
export const orderSelector = (rs: RootState) => rs.order;
export const orderIsLoadingSelector = (rs: RootState) => rs.order.isLoading;
export const orderDataSelector = (rs: RootState) => rs.order.orderData;
// ---

// user
export const userSelector = (rs: RootState) => rs.user;
export const isAuthCheckedSelector = (rs: RootState) => rs.user.isAuthChecked;
export const userDataSelector = (rs: RootState) => rs.user.data;
export const userNameSelector = (rs: RootState) => rs.user.data?.name;
export const userRegistrErrSelector = (rs: RootState) => rs.user.registerErr;
export const userLoginErrSelector = (rs: RootState) => rs.user.loginErr;
// ---

// orders
export const ordersListSelector = (rs: RootState) => rs.orders;
export const ordersDataSelector = (rs: RootState) => rs.orders.data;

export const orderInfoSelector = (orderNumber: string) => (rs: RootState) => {
  if (rs.order.orderByNumber?.number === +orderNumber) {
    return rs.order.orderByNumber;
  }

  const orderList = rs.orders.data.length
    ? rs.orders.data
    : rs.feed.orders.length && rs.feed.orders;

  if (orderList) {
    const info = orderList.find((i) => i.number === +orderNumber);
    if (info) return info;
  }

  return null;
};
// ---
