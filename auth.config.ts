/* eslint-disable no-param-reassign */
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

import { postRefreshAccessToken } from "./apis/auth";

import type { NextAuthConfig } from "next-auth";

async function refreshAccessToken(token: JWT) {
  try {
    const { accessToken } = await postRefreshAccessToken(token.refreshToken!);
    return {
      ...token,
      accessToken,
      accessTokenExpires: jwtDecode(accessToken).exp,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        return {
          ...user,
          accessTokenExpires: jwtDecode(user.accessToken).exp,
        };
      }

      const timeRemaining =
        token!.accessTokenExpires! - Math.floor(new Date().getTime() / 1000);

      if (timeRemaining <= 0) {
        const newToken = await refreshAccessToken(token);
        return { ...newToken };
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
