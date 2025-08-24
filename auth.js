import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { User } from "./model/user-model";
import { dbConnect } from "./service/connectMongo";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials == null) return null;

        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials?.email }).lean();
          console.log(user);

          if (!user) return null;

          const isMatch = await bcrypt.compare(
            credentials?.password,
            user?.password
          );

          if (!isMatch) return null;

          return user;

          // if (user) {
          //   const isMatch = await bcrypt.compare(
          //     credentials?.password,
          //     user?.password
          //   );

          //   if (isMatch) {
          //     return user;
          //   } else {
          //     console.error("password mismatch");
          //     throw new Error("Check your password");
          //   }
          // } else {
          //   console.error("user not found");
          //   throw new Error("User not found");
          // }
        } catch (error) {
          console.log(error);
        }
      },
    }),
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
  ],
});
