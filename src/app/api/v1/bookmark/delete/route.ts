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

        // Find the bookmark to delete
        const bookmark = await prisma.bookmark.findFirst({
            where: {
                userId: user.id,
                issueId: issueId,
            },
        });

        if (!bookmark) {
            return NextResponse.json(
                {
                    success: true,
                    data: {
                        message: "Bookmark not found",
                    },
                },
                { status: 200 }
            );
        }

        // Delete the bookmark
        await prisma.bookmark.delete({
            where: {
                id: bookmark.id,
            },
        });

        // Update usage quota (decrease bookmark count)
        const usageQuota = await prisma.usageQuota.findUnique({
            where: { userId: user.id },
        });

        if (usageQuota && usageQuota.bookmarks > 0) {
            await prisma.usageQuota.update({
                where: { userId: user.id },
                data: {
                    bookmarks: usageQuota.bookmarks - 1,
                },
            });
        }

        return NextResponse.json(
            {
                success: true,
                data: {
                    message: "Bookmark deleted",
                },
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error deleting bookmark:", error);

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
