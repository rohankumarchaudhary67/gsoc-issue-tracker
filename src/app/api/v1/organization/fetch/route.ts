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

        // Get user's accessed organizations (organizations the user has interacted with)
        const accessedOrganizations = await prisma.userOrganization.findMany({
            where: { userId: user.id },
            include: {
                org: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        openIssues: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Get the IDs of accessed organizations
        const accessedOrgIds = accessedOrganizations.map(
            (userOrg) => userOrg.org.id
        );

        // Get organizations that the user has NOT accessed
        const nonAccessedOrganizations = await prisma.organization.findMany({
            where: {
                id: {
                    notIn: accessedOrgIds,
                },
            },
            select: {
                id: true,
                name: true,
                image: true,
                openIssues: true,
            },
            orderBy: { name: "asc" },
        });

        // Format the response to match the expected structure
        const responseData = {
            success: true,
            data: {
                accessedOrganizations: accessedOrganizations.map((userOrg) => ({
                    id: userOrg.org.id,
                    name: userOrg.org.name,
                    image: userOrg.org.image || "imageURL",
                    openIssues: userOrg.org.openIssues,
                })),
                nonAccessedOrganizations: nonAccessedOrganizations.map(
                    (org) => ({
                        id: org.id,
                        name: org.name,
                        image: org.image || "imageURL",
                        openIssues: org.openIssues,
                    })
                ),
            },
            status: 200,
        };

        return NextResponse.json(responseData, { status: 200 });
    } catch (error: unknown) {
        console.error("Error fetching organizations:", error);

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
