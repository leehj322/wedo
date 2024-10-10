import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { postSignIn } from "./apis/auth";
import { authConfig } from "./auth.config";
import { SignInResponse } from "./dtos/AuthDtos";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user: SignInResponse = await postSignIn({ email, password });
          if (!user) return null;

          return user;
        }

        return null;
      },
    }),
  ],
});
