import { verifyAuth } from "@/lib/verify-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: { issueId: string } }
) {
    try {
        const auth = await verifyAuth(req);

        if (auth.error) {
            return NextResponse.json(auth.error, {
                status: auth.status || 500,
            });
        }

        const user = await prisma.user.findUnique({
            where: { email: auth.email },
            include: {
                UsageQuota: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const { issueId } = params;

        // Validate issueId format (assuming cuid)
        if (!issueId || typeof issueId != "string") {
            return NextResponse.json(
                { error: "Invalid issue ID" },
                { status: 400 }
            );
        }

        // Check if user has already viewed this issue
        const existingView = await prisma.history.findFirst({
            where: {
                userId: user.id,
                issueId: issueId,
            },
        });

        // Handle FREE subscription restrictions
        if (user.subscription === "FREE") {
            // If FREE user has already viewed this issue, deny access
            if (existingView) {
                return NextResponse.json(
                    {
                        error: "You can only view each issue once with a FREE subscription. Upgrade to PRO for unlimited access.",
                        alreadyViewed: true,
                        subscription: user.subscription,
                        upgradeRequired: true,
                    },
                    { status: 403 }
                ); // 403 Forbidden
            }
        }

        // Fetch the issue by ID
        const issue = await prisma.issue.findUnique({
            where: { id: issueId },
            include: {
                repo: {
                    include: {
                        organization: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                description: true,
                            },
                        },
                    },
                },
                bookmarks: {
                    where: { userId: user.id },
                    select: { id: true },
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        },
                    },
                    orderBy: { createdAt: "asc" },
                },
                history: {
                    where: { userId: user.id },
                    orderBy: { createdAt: "desc" },
                    take: 1, // Only need the most recent view
                },
            },
        });

        if (!issue) {
            return NextResponse.json(
                { error: "Issue not found" },
                { status: 404 }
            );
        }

        // Record this view in user's history based on subscription type
        if (user.subscription === "FREE") {
            // For FREE users, only create history entry if it's a new view
            if (!existingView) {
                await prisma.history.create({
                    data: {
                        userId: user.id,
                        issueId: issue.id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                });

                await prisma.usageQuota.update({
                    where: { userId: user.id },
                    data: {
                        openedIssues: {
                            increment: 1,
                        },
                    },
                });
            }
        } else if (user.subscription === "PRO") {
            // For PRO users, create new entry or update existing one
            if (existingView) {
                // Update the existing history entry's updatedAt
                await prisma.history.update({
                    where: { id: existingView.id },
                    data: {
                        updatedAt: new Date(),
                    },
                });
                await prisma.usageQuota.update({
                    where: { userId: user.id },
                    data: {
                        openedIssues: {
                            increment: 1,
                        },
                    },
                });
            } else {
                // Create new history entry for PRO users
                await prisma.history.create({
                    data: {
                        userId: user.id,
                        issueId: issue.id,
                        createdAt: new Date(),
                    },
                });

                await prisma.usageQuota.update({
                    where: { userId: user.id },
                    data: {
                        openedIssues: {
                            increment: 1,
                        },
                    },
                });
            }
        }

        // Check if the user has bookmarked this issue
        const isBookmarked = issue.bookmarks.length > 0;

        // Check if user has viewed this issue recently
        const hasViewed = issue.history.length > 0;
        const lastViewed = issue.history[0]?.updatedAt || null;

        // Format the response data
        const formattedIssue = {
            id: issue.id,
            github_id: Number(issue.githubId),
            number: issue.number,
            title: issue.title,
            body: issue.body,
            state: issue.state,
            labels: issue.labels,
            html_url: issue.html_url,
            comments_count: issue.comments_count,
            createdAt: issue.createdAt,
            updatedAt: issue.updatedAt,
            repo: {
                name: issue.repo.name,
                languages: issue.repo.language,
                difficulty: issue.repo.difficulty,
                organization: {
                    name: issue.repo.organization.name,
                    image: issue.repo.organization.image,
                    description: issue.repo.organization.description,
                },
            },
            isBookmarked,
            hasViewed,
            lastViewed,
            comments: issue.comments.map((comment) => ({
                id: comment.id,
                comment: comment.comment,
                createdAt: comment.createdAt,
                user: {
                    name: comment.user.name,
                    image: comment.user.image,
                },
            })),
        };

        return NextResponse.json(formattedIssue, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
