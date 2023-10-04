import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://172.16.41.13:1890/api",
    prepareHeaders: (headers) => {
      // Retrieve the token from localStorage
      const token = JSON.parse(localStorage.getItem("token")!);
      // Set the token in the headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body: { code: string; username: string; phoneNumber: string }) => {
        return {
          url: "/Users/VerifyPhone",
          method: "post",
          body,
        };
      },
    }),
    loginUser: builder.mutation({
      query: (body: { code: string; username: string }) => {
        return {
          url: "/Users/LoginVerifyCode",
          method: "post",
          body,
        };
      },
    }),
    refreshTokenUser: builder.mutation({
      query: (body: { refreshToken: string }) => {
        return {
          url: "/Users/RefreshToken",
          method: "post",
          body,
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: "/Users/LogOut",
          method: "post",
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useLogoutMutation, useRegisterUserMutation, useRefreshTokenUserMutation } = authApi;
