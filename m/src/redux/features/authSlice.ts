import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface AuthSate {
  token: string | null;
  refreshToken: any | null;
  userInfo: object | null;
}

const initialState: AuthSate = {
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null,
  refreshToken: localStorage.getItem("refreshToken") ? JSON.parse(localStorage.getItem("refreshToken")!) : null,
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        data: any;
        userInfo: any;
        refreshToken: {};
        token: string;
      }>
    ) => {
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("refreshToken", JSON.stringify(action.payload.refreshToken));
      localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userInfo = action.payload.userInfo;
    },
    setRefreshToken: (
      state,
      action: PayloadAction<{
        data: any;
        refreshToken: string;
        token: string;
        userInfo: any;
      }>
    ) => {
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("refreshToken", JSON.stringify(action.payload.refreshToken));
      localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userInfo = action.payload.userInfo;
    },
    logout: (state) => {
      localStorage.clear();
      state.token = null;
      state.refreshToken = null;
      state.userInfo = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logout, setRefreshToken } = authSlice.actions;

export default authSlice.reducer;
