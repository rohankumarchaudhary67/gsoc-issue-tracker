import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "./prisma";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            name?: string;
            email?: string;
            image?: string;
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }) {
            const { email, name } = user;
            const image = user.image || null;

            if (!email) {
                return false;
            }

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (existingUser) {
                await prisma.user.update({
                    where: {
                        id: existingUser?.id,
                    },
                    data: {
                        name: name,
                        image: image,
                    },
                });
            } else {
                await prisma.user.create({
                    data: {
                        email: email,
                        name: name,
                        image: image,
                    },
                });
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
            }

            return token;
        },

        async session({ session, token }) {
            // Add the token to the session for middleware access
            session.accessToken = token.jti as string;
            return session;
        },
    },
    // Enable JWT sessions instead of database sessions
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
};
