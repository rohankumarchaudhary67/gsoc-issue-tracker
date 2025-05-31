import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";

export async function verifyAuth(req: NextRequest) {
    try {
        // Get token from NextAuth (automatically handles JWT verification)
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token || !token.userId) {
            return {
                error: "Unauthorized",
                status: 401,
            };
        }

        // Get full user data from database
        const user = await prisma.user.findUnique({
            where: { id: token.userId },
            select: {
                email: true,
            },
        });

        if (!user) {
            return {
                error: "User not found",
                status: 404,
            };
        }

        return {
            email: user.email,
            token,
            status: 200,
        };
    } catch (error) {
        console.error("Auth verification error:", error);
        return {
            error: "Authentication failed",
            status: 500,
        };
    }
}
