import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { spotifyApi } from "@/lib/spotify";

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      sope: "user-library-read user-read-playback-state user-read-currently-playing user-top-read",
    }),
  ],
  callbacks: {
    // async signIn(user, account, profile) {
    //   if (account.provider === "spotify") {
    //     const accessToken = account.accessToken;
    //     spotifyApi.setAccessToken(accessToken);
    //   }
    //   return true;
    // },

    // async jwt(token) {
    //   console.log("token", token.account.access_token);

    //   const accessToken = await token.account.access_token;
    //   if (token.account.provider === "spotify")
    //     spotifyApi.setAccessToken(accessToken);
    // },
    // async jwt({ token, account, profile }) {
    //   // Persist the OAuth access_token and or the user id to the token right after signin
    //   if (account) {
    //     token.accessToken = account.access_token;
    //     token.id = profile.id;
    //   }
    //   //   console.log("token.accessToken", token.accessToken);
    //   //   console.log("token", token);
    //   spotifyApi.setAccessToken(token.accessToken);
    //   return token;
    //},

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },

    // async session(session, token, user) {
    //   console.log("session", session);
    //   console.log("token", token);
    //   console.log("user", user);
    // },
  },
};

export default NextAuth(authOptions);
