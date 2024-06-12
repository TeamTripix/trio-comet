import { User } from "../../../../../models/user";
import { otpSchema } from "../../../../../models/otp";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
let jwt = require("jsonwebtoken");
const authOptions: NextAuthOptions = {
  // site: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req: any) {
        if (!credentials.OTP || !credentials.number) {
          return null;
        }
        const data = new User({
          number: credentials.number,
        });

        try {
          const isUserAlreadyExist = await User.find({
            number: credentials.number,
          });
          if (isUserAlreadyExist.length === 0) {
            const OTPSendResponse = await otpSchema.find({
              number: credentials.number,
              OTP: credentials.OTP,
            });

            if (OTPSendResponse.length === 1) {
              const response = await data.save();
              const otpDelRes = await otpSchema.deleteOne({
                number: credentials.number,
                OTP: credentials.OTP,
              });
              return response;
            } else {
              return "invalid OTP";
            }
          } else {
            const OTPSendResponse = await otpSchema.find({
              number: credentials.number,
              OTP: credentials.OTP,
            });

            if (OTPSendResponse.length === 1) {
              const otpDelRes = await otpSchema.deleteOne({
                number: credentials.number,
                OTP: credentials.OTP,
              });

              const user = await User.find({ number: credentials.number });
              const token = await jwt.sign(
                {
                  data: {
                    number: user[0].number,
                  },
                },
                process.env.JWT_KEY
              );
              return { name: user[0].number, email: user[0]._id,token,userInfo:user[0] };
            } else {
              return null;
            }
          }
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.JWT_KEY,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
