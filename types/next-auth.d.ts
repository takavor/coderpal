import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      username?: string;
      id: string;
      githubLink?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username?: string;
    githubLink?: string;
  }
}
