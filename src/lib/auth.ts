import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "./prisma";
import { Subscription } from "@prisma/client";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            id: string;
            name?: string;
            email?: string;
            image?: string;
            subscription: Subscription;
        };
    }

    interface User {
        id: string;
        subscription: Subscription;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId: string;
        subscription: Subscription;
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

            try {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                    include: {
                        UsageQuota: true, // Updated field name to match schema
                    },
                });

                if (existingUser) {
                    // Update existing user info
                    await prisma.user.update({
                        where: {
                            id: existingUser.id,
                        },
                        data: {
                            name: name,
                            image: image,
                            updatedAt: new Date(),
                        },
                    });
                } else {
                    // Create new user with usage quota
                    await prisma.user.create({
                        data: {
                            email: email,
                            name: name,
                            image: image,
                            subscription: Subscription.FREE,
                            UsageQuota: {
                                // Updated field name to match schema
                                create: {
                                    aiQueries: 0,
                                    aiQueriesLimit: 100, // Updated default to match schema
                                    openedIssues: 0,
                                    openedIssuesLimit: 500, // Updated default to match schema
                                    bookmarks: 0,
                                    bookmarksLimit: 100, // Updated default to match schema
                                    organizationAccess: 0,
                                    organizationAccessLimit: 50, // Updated field name and default to match schema
                                    lastReset: new Date(), // Updated field name to match schema
                                },
                            },
                        },
                    });
                }

                return true;
            } catch (error) {
                console.error("Error during sign in:", error);
                return false;
            }
        },

        async jwt({ token, user, trigger }) {
            // Initial sign in
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                    select: {
                        id: true,
                        subscription: true,
                    },
                });

                if (dbUser) {
                    token.userId = dbUser.id;
                    token.subscription = dbUser.subscription;
                }
            }

            // Update token on session update
            if (trigger === "update") {
                const dbUser = await prisma.user.findUnique({
                    where: { id: token.userId },
                    select: {
                        subscription: true,
                    },
                });

                if (dbUser) {
                    token.subscription = dbUser.subscription;
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.userId;
                session.user.subscription = token.subscription;
                session.accessToken = token.jti as string;
            }

            return session;
        },
    },
    // Enable JWT sessions instead of database sessions
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
};
