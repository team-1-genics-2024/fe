import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig, Session, User } from "next-auth";
import type { UserType, UserResponseType } from "@/types/user";
import { AdapterUser } from "next-auth/adapters";
import { CredentialsType, SocialCredentialsType } from "@/types/login";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface User extends UserType {}
}

declare module "next-auth/adapters" {
  interface AdapterUser extends UserType {}
}

declare module "next-auth/jwt" {
  interface JWT extends UserType {}
}

async function refreshAccessToken(refreshToken: string) {
  try {
    const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseApiUrl}api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      authorize: async (credentials) => {
        try {
          const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
          const user = await fetchUser(`${baseApiUrl}api/auth/login`, {
            email:
              typeof credentials.email === "string" ? credentials.email : "",
            password:
              typeof credentials.password === "string"
                ? credentials.password
                : "",
          });

          return user ? createUser(user) : null;
        } catch (error) {
          console.error("Error during authentication", error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${baseApiUrl}api/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const user = await response.json();

        if (response.ok) {
          return user;
        } else {
          throw new Error(user.message || "Sign in failed");
        }
      },
    }),
    CredentialsProvider({
      id: "social",
      name: "Custom Social Login",
      authorize: async (credentials) => {
        try {
          const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
          const user = await fetchUser(`${baseApiUrl}api/auth/google`, {
            auth_code:
              typeof credentials.authCode === "string"
                ? credentials.authCode
                : "",
          });

          return user ? createUser(user) : null;
        } catch (error) {
          console.error("Error during authentication", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      // Add the user properties to the token after signing in
      if (user) {
        token.id = user.id as string;
        token.avatar = user.avatar;
        token.name = user.name;
        token.email = user.email;
        token.premiumSubscription = user.premiumSubscription;
        token.accessToken = user.accessToken;
        token.subId = user.subId;
        token.refreshToken = user.refreshToken;
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
      }
      if (token.exp && Date.now() >= token.exp * 1000) {
        try {
          const { accessToken, refreshToken } = await refreshAccessToken(
            token.refreshToken
          );
          return {
            ...token,
            accessToken,
            refreshToken,
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // or set based on accessToken's actual expiry
          };
        } catch (error) {
          console.error("Error refreshing token:", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Create a user object with token properties
      if (token.error) {
        return {
          ...session,
          error: token.error,
        };
      }

      const userObject: AdapterUser = {
        id: token.id,
        avatar: token.avatar,
        name: token.name,
        premiumSubscription: token.premiumSubscription,
        accessToken: token.accessToken,
        subId: token.subId,
        refreshToken: token.refreshToken,
        email: token.email ? token.email : "",
        emailVerified: null,
      };

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

async function fetchUser(
  url: string,
  body: CredentialsType | SocialCredentialsType
) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const user = await res.json();

    if (res.ok && user) {
      return user;
    } else {
      console.error(`Failed to fetch user: ${res.status} ${res.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(`Error during fetch: ${error}`);
    return null;
  }
}

function createUser(user: UserResponseType) {
  const userObject: UserType = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    premiumSubscription: user.premium_subscription,
    accessToken: user.access_token,
    refreshToken: user.refresh_token,
    subId: user.sub_id,
  };

  return userObject;
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
