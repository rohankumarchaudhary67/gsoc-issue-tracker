import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/verify-auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
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

        const { issueId } = await req.json();

        // Validate issueId format (assuming cuid)
        if (!issueId || typeof issueId !== "string") {
            return NextResponse.json(
                { error: "Invalid issue ID" },
                { status: 400 }
            );
        }

        // Verify if the issue exists
        const issue = await prisma.issue.findUnique({
            where: { id: issueId },
        });

        if (!issue) {
            return NextResponse.json(
                { error: "Issue not found" },
                { status: 404 }
            );
        }

        // Check if bookmark already exists
        const existingBookmark = await prisma.bookmark.findFirst({
            where: {
                userId: user.id,
                issueId: issueId,
            },
        });

        if (existingBookmark) {
            return NextResponse.json(
                {
                    success: true,
                    data: {
                        message: "Already bookmarked",
                    },
                },
                { status: 200 }
            );
        }

        // Check usage quota for bookmarks
        const usageQuota = await prisma.usageQuota.findUnique({
            where: { userId: user.id },
        });

        if (usageQuota && usageQuota.bookmarks >= usageQuota.bookmarksLimit) {
            return NextResponse.json(
                { error: "Bookmark limit reached" },
                { status: 429 }
            );
        }

        // Create the bookmark
        const newBookmark = await prisma.bookmark.create({
            data: {
                userId: user.id,
                issueId: issueId,
            },
        });

        if (!newBookmark) {
            return NextResponse.json(
                { error: "Failed to create bookmark" },
                { status: 500 }
            );
        }

        // Update usage quota
        if (usageQuota) {
            await prisma.usageQuota.update({
                where: { userId: user.id },
                data: {
                    bookmarks: usageQuota.bookmarks + 1,
                },
            });
        }

        return NextResponse.json(
            {
                success: true,
                data: {
                    message: "Bookmarked",
                },
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error adding bookmark:", error);

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: "An unexpected error occurred",
            },
            { status: 500 }
        );
    }
}
