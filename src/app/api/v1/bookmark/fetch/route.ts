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

        // Fetch user's bookmarked issues with complete details
        const bookmarks = await prisma.bookmark.findMany({
            where: { userId: user.id },
            include: {
                issue: {
                    include: {
                        repo: {
                            include: {
                                organization: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Format the bookmarked issues according to the response structure
        const bookmarkedIssues = bookmarks.map((bookmark) => ({
            id: bookmark.issue.id,
            title: bookmark.issue.title,
            body: bookmark.issue.body || "",
            repo: {
                name: bookmark.issue.repo.name,
                organization: {
                    name: bookmark.issue.repo.organization.name,
                },
                languages: bookmark.issue.repo.language,
                difficulty: bookmark.issue.repo.difficulty,
            },
        }));

        return NextResponse.json(
            {
                success: true,
                data: {
                    bookmarkedIssues: bookmarkedIssues,
                },
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error fetching bookmarks:", error);

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
