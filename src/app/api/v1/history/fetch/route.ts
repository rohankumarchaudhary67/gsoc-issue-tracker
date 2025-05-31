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

        // Fetch user's opened issues history
        const openedIssues = await prisma.history.findMany({
            where: {
                userId: user.id,
            },
            include: {
                issue: {
                    select: {
                        id: true,
                        title: true,
                        createdAt: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Format the response to match the expected structure
        const formattedIssues = openedIssues.map((history) => ({
            id: history.issue.id,
            title: history.issue.title,
            createdAt: history.issue.createdAt,
            updateAt: history.updatedAt,
        }));

        return NextResponse.json(
            {
                success: true,
                data: {
                    openedIssues: formattedIssues,
                },
                status: 200,
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error fetching history:", error);
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
