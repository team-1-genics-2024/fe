import NextAuth, { DefaultSession } from "next-auth";
interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
}

type UserResponseType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  access_token: string;
  refresh_token: string;
};

export type { UserType, UserResponseType };

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user: {
      id: string;
      name: string;
      email: string;
      avatar?: string;

      refreshToken?: string;
    } & DefaultSession["user"];
  }
}
