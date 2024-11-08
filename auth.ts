import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig, Session } from "next-auth";
import type { UserType, UserResponseType } from "@/types/user";
import { CredentialsType, SocialCredentialsType } from "@/types/login";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
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
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name;
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.accessToken) session.accessToken = token.accessToken;

      return session;
    },
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
    accessToken: user.access_token,
    refreshToken: user.refresh_token,
  };

  return userObject;
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
