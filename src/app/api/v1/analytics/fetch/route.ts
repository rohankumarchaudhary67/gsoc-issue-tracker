import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/verify-auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (auth.error) {
            return NextResponse.json(auth.error, {
                status: auth.status || 500,
            });
        }

        const user = await prisma.user.findUnique({
            where: { email: auth.email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Fetch user's usage quota which contains all analytics data
        const usageQuota = await prisma.usageQuota.findUnique({
            where: { userId: user.id },
        });

        // If user doesn't have usage quota, create one with default values
        if (!usageQuota) {
            const newUsageQuota = await prisma.usageQuota.create({
                data: {
                    userId: user.id,
                },
            });

            return NextResponse.json(
                {
                    success: true,
                    data: {
                        openedIssues: newUsageQuota.openedIssues,
                        bookmarks: newUsageQuota.bookmarks,
                        aiQueries: newUsageQuota.aiQueries,
                        organizationAccess: newUsageQuota.organizationAccess,
                    },
                    status: 200,
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: {
                    openedIssues: usageQuota.openedIssues,
                    bookmarks: usageQuota.bookmarks,
                    aiQueries: usageQuota.aiQueries,
                    organizationAccess: usageQuota.organizationAccess,
                    lastResetAt: usageQuota.lastReset,
                },
                status: 200,
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error fetching analytics:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                    status: 500,
                },
                { status: 500 }
            );
        }
        return NextResponse.json(
            {
                success: false,
                error: "An unexpected error occurred",
                status: 500,
            },
            { status: 500 }
        );
    }
}
