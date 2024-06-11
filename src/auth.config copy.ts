import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_API_KEY,
  pages: {
    error: "/",
    signIn: "/auth/signin",
    signOut: "/auth/signin",
  },
  callbacks: {
    authorized({ auth }) {
      console.log("auth", auth);
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
    jwt({ token, user }: any) {
      console.log("user", user);
      console.log("token", token);
      if (user) {
        (token.accessToken = user?.data?.token),
          (token.ownProfile = user?.data?.ownProfile);
        token.expiresIn = user.data?.expires_in;
      }

      console.log("token ss", token);

      return token;

      // if (!user) return token;
      // return {
      //   ...token,
      //   accessToken: user,

      // };
    },
    session({ session, token, user }: any) {
      console.log("session callback", session);
      console.log("token session callback", token);
      console.log("user session callback", user);

      if (token) {
        (session.accessToken = token.accessToken),
          (session.ownProfile = token.ownProfile);
        session.user.name = token.ownProfile.name;
        (session.user.email = token.ownProfile.email),
          (session.user.roles = token.ownProfile.roles);
      }

      return session;

      // return {
      //   ...session,
      //   accessToken: token.accessToken,
      // };
    },
  },
  providers: [],
} satisfies NextAuthConfig;
