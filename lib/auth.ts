import NextAuth, { NextAuthOptions } from "next-auth";

import GitHubProvider from "next-auth/providers/github";

import { MongoDBAdapter } from "@auth/mongodb-adapter";

import client from "@/lib/db";

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENTID as string,
      clientSecret: process.env.GITHUB_CLIENTSECRET as string,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
          githubLink: profile.html_url,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = user.username;
      session.user.id = user.id;
      session.user.githubLink = user.githubLink;

      return session;
    },
  },
};

export default authOptions;
