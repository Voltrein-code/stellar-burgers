import { RootState } from "../store";

export const isAuthSelector = (state: RootState) => {
  state.user.isAuth;
} 
