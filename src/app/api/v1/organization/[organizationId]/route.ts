import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/verify-auth";
import prisma from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ organizationId: string }> }
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
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const { organizationId } = await params;

        // Validate organizationId format
        if (!organizationId || typeof organizationId !== "string") {
            return NextResponse.json(
                { error: "Invalid organization ID" },
                { status: 400 }
            );
        }

        // Check if user has access to this organization
        const userOrganization = await prisma.userOrganization.findFirst({
            where: {
                userId: user.id,
                orgId: organizationId,
            },
        });

        if (!userOrganization) {
            return NextResponse.json(
                {
                    error: "Access denied. You don't have access to this organization",
                },
                { status: 403 }
            );
        }

        // Fetch organization details with repos and issues
        const organization = await prisma.organization.findUnique({
            where: { id: organizationId },
            include: {
                repos: {
                    include: {
                        issues: {
                            orderBy: { createdAt: "desc" },
                            take: 100, // Limit issues per repo to prevent excessive data
                        },
                    },
                    orderBy: { name: "asc" },
                },
            },
        });

        if (!organization) {
            return NextResponse.json(
                { error: "Organization not found" },
                { status: 404 }
            );
        }

        // Calculate total issues across all repos
        const totalIssues = organization.repos.reduce(
            (total, repo) => total + repo.issues.length,
            0
        );

        return NextResponse.json(
            {
                success: true,
                data: {
                    id: organization.id,
                    name: organization.name,
                    image: organization.image || "",
                    description: organization.description || "",
                    openIssues: organization.openIssues,
                    totalRepos: organization.repos.length,
                    totalIssues: totalIssues,
                    repos: organization.repos.map((repo) => ({
                        id: repo.id,
                        name: repo.name,
                        language: repo.language,
                        difficulty: repo.difficulty,
                        totalIssues: repo.issues.length,
                        createdAt: repo.createdAt,
                        updatedAt: repo.updatedAt,
                        issues: repo.issues.map((issue) => ({
                            id: issue.id,
                            githubId: issue.githubId.toString(),
                            number: issue.number,
                            title: issue.title,
                            body: issue.body || "",
                            state: issue.state,
                            html_url: issue.html_url,
                            comments_count: issue.comments_count,
                            labels: issue.labels,
                            createdAt: issue.createdAt,
                            updatedAt: issue.updatedAt,
                        })),
                    })),
                    createdAt: organization.createdAt,
                    updatedAt: organization.updatedAt,
                },
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error fetching organization details:", error);

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
