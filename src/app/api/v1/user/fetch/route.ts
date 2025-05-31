import { verifyAuth } from "@/lib/verify-auth";
import { NextRequest, NextResponse } from "next/server";
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

        return NextResponse.json(
            {
                name: user.name,
                email: user.email,
                image: user.image,
                subscription: user.subscription,
                createdAt: user.createdAt,
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
