import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import AuthService from "@/services/AuthService";

// async function getUser(email: string, password: string): Promise<any> {
//   return {
//     id: 1,
//     name: "test user",
//     email: email,
//     password: password,
//   };
// }

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      // async authorize(credentials) {
      // 	const user = await getUser(
      // 		credentials.email as string,
      // 		credentials.password as string
      // 	);

      // 	return user ?? null;
      // },
      async authorize(credentials) {
        // try {
          const user = await AuthService.login(credentials);
          console.log("user", user.status);
          
          if (user.status) {
            // return {
            //   ...user,
            //   accessToken: user.data?.token,
            //   subscription: user.data?.status === "active" ? true : false,
            //   can_see_manage_teams : user.data?.can_see_manage_teams === true ? true : false
            // };
            const getOwnProfile = await AuthService.getOwnProfile({
              token: user.data.token,
            });
            console.log("getOwnProfile", getOwnProfile);

            user.data.ownProfile = getOwnProfile.data;
            return user;
          } else {
            throw new Error("Invalid credentials");
          }
        // } catch (error) {
        //   console.log("error", error);
        //   throw new Error("Login failed");
        // }
      },
    }),
  ],
});
