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

        const { issueId, comment } = await req.json();

        // Validate issueId format (assuming cuid)
        if (!issueId || typeof issueId != "string") {
            return NextResponse.json(
                { error: "Invalid issue ID" },
                { status: 400 }
            );
        }

        // Validate comment format
        if (!comment || typeof comment != "string") {
            return NextResponse.json(
                { error: "Invalid comment" },
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

        // Create the comment
        const newComment = await prisma.comment.create({
            data: {
                userId: user.id,
                issueId: issue.id,
                comment: comment,
            },
        });

        if (!newComment) {
            return NextResponse.json(
                { error: "Failed to create comment" },
                { status: 500 }
            );
        }

        // Return the created comment
        return NextResponse.json(
            {
                message: "Comment added successfully",
            },
            {
                status: 200,
            }
        );
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
