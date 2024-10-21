export const sessionConfig = {
  cookieName: "user_session",
  password: process.env.SESSION_SECRET as string, // Should be at least 32 characters
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60, // 15 minutes
  },
};