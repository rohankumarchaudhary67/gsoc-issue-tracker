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

        const { organizationId } = await req.json();

        // Validate organizationId format (assuming cuid)
        if (!organizationId || typeof organizationId !== "string") {
            return NextResponse.json(
                { error: "Invalid organization ID" },
                { status: 400 }
            );
        }

        // Verify if the organization exists
        const organization = await prisma.organization.findUnique({
            where: { id: organizationId },
        });

        if (!organization) {
            return NextResponse.json(
                { error: "Organization not found" },
                { status: 404 }
            );
        }

        // Check if user already has access to this organization
        const existingAccess = await prisma.userOrganization.findFirst({
            where: {
                userId: user.id,
                orgId: organizationId,
            },
        });

        if (existingAccess) {
            return NextResponse.json(
                {
                    success: true,
                    data: {
                        message: "Organization already accessed",
                    },
                },
                { status: 200 }
            );
        }

        // Check usage quota for organization access
        const usageQuota = await prisma.usageQuota.findUnique({
            where: { userId: user.id },
        });

        if (
            usageQuota &&
            usageQuota.organizationAccess >= usageQuota.organizationAccessLimit
        ) {
            return NextResponse.json(
                { error: "Organization access limit reached" },
                { status: 429 }
            );
        }

        // Create new organization access record
        await prisma.userOrganization.create({
            data: {
                userId: user.id,
                orgId: organizationId,
            },
        });

        // Update usage quota
        if (usageQuota) {
            await prisma.usageQuota.update({
                where: { userId: user.id },
                data: {
                    organizationAccess: usageQuota.organizationAccess + 1,
                },
            });
        }

        return NextResponse.json(
            {
                success: true,
                data: {
                    message: "Organization accessed",
                },
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error accessing organization:", error);

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
