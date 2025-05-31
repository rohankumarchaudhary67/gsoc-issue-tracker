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

        const body = await req.json();
        const { commentId } = body;

        // Validate commentId format (assuming cuid)
        if (!commentId || typeof commentId != "string") {
            return NextResponse.json(
                { error: "Invalid comment ID" },
                { status: 400 }
            );
        }

        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
                userId: user.id,
            },
        });

        if (!comment) {
            return NextResponse.json(
                {
                    error: "Comment not found or you do not have permission to delete it",
                },
                { status: 404 }
            );
        }

        await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });

        return NextResponse.json(
            { message: "Comment deleted successfully" },
            { status: 200 }
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
