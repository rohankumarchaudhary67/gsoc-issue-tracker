import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import jwt from 'jsonwebtoken';
import prisma from '@repo/db/db';

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        user: {
            name?: string;
            email?: string;
            image?: string;
            currentOpenIssue?: number;
            currentAiQuestion?: number;
            openIssueLimit?: number;
            aiQuestionLimit?: number;
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.AUTH_SECRET || 'secret123',
    pages: {
        signIn: '/',
    },
    callbacks: {
        async signIn({ user }) {
            const { email, name } = user;
            const image = (user).image || null;

            if (!email) {
                console.error('Email not available from GitHub');
                return false;
            }

            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        email,
                        name,
                        image,
                        currentOpenIssue: 0,
                        currentAiQuestion: 0,
                        openIssueLimit: 400,
                        aiQuestionLimit: 20,
                        currentPlan: 'freeTrial',
                    },
                });
                console.log('New user created in the database');
            } else {
                await prisma.user.update({
                    where: { email },
                    data: { name, image },
                });
                console.log('Existing user updated in the database');
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                const newToken = jwt.sign(
                    { email: user.email, name: user.name, avatar: user.image },
                    process.env.SESSION_TOKEN_SECRET || 'jwtsecret123',
                    { expiresIn: '7d' }
                );

                await prisma.user.update({
                    where: { email: user.email! },
                    data: { sessionToken: newToken },
                });

                token.accessToken = newToken;
            }

            return token;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
};
