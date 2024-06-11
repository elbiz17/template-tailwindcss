import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import AuthService from '@/services/AuthService';

export const authConfig: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_PUBLIC_API_KEY,
  pages: {
    error: '/',
    signIn: '/auth/signin',
    signOut: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.accessToken = user.data?.token;
        token.ownProfile = user.data?.ownProfile;
        token.expiresIn = user.data?.expires_in;
        token.subscription = user.data?.status === 'active' ? true : false;
        token.can_see_manage_teams = user.data?.can_see_manage_teams === true ? true : false
        token.expiresIn = Date.now() + user.data?.expires_in * 1000

      }
      if(Date.now() < token.expiresIn){
        return token
      }

      console.log("token", token);
      console.log("token server", token?.expiresIn);
      console.log("token access token", token?.accessToken);
      

      return AuthService.refreshToken(token.accessToken)
    },
    async session({ session, token }:any) {
      if (token) {
        session.accessToken = token.accessToken;
        session.ownProfile = token.ownProfile;
        session.user = {
          name: token.ownProfile?.name,
          email: token.ownProfile?.email,
          roles: token.ownProfile?.roles,
        };
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // try {
          const user = await AuthService.login(credentials);
          if (user.status === true) {
            const getOwnProfile = await AuthService.getOwnProfile({ token: user.data.token });
            user.data.ownProfile = getOwnProfile.data;
            return user;
          }
          console.log('user', user);
          
          throw new Error(JSON.stringify({
            status:user.status,
            message:user.message,
            errors: user.errors,
            data: null
          }))
        // } catch (error) {
        //   console.error(error);
        //   throw new Error('Authorization error');
        // }
      },
    }),
  ],
};
