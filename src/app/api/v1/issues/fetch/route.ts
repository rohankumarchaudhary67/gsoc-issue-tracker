import prisma from "@/lib/prisma";
import { verifyAuth } from "@/lib/verify-auth";
import { Difficulty } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface QueryParams {
    page: number;
    limit: number;
    difficulty?: Difficulty;
    languages?: string;
    label?: string;
    search?: string;
}

interface IssueWhereConditions {
    repo?: {
        difficulty?: Difficulty;
        language?: {
            hasSome: string[];
        };
    };
    labels?: {
        hasSome: string[];
    };
    OR?: Array<{
        title?: {
            contains: string;
            mode: "insensitive";
        };
        body?: {
            contains: string;
            mode: "insensitive";
        };
    }>;
}

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
            return new Response("User not found", { status: 404 });
        }

        const url = new URL(req.url);
        const searchParams = url.searchParams;

        const queryParams: QueryParams = {
            page: parseInt(searchParams.get("page") || "1"),
            limit: Math.min(parseInt(searchParams.get("limit") || "100"), 100),
            difficulty: searchParams.get("difficulty") as
                | Difficulty
                | undefined,
            languages: searchParams.get("languages") || undefined,
            label: searchParams.get("label") || undefined,
            search: searchParams.get("search") || undefined,
        };

        // Validate pagination parameters
        if (queryParams.page < 1) queryParams.page = 1;
        if (queryParams.limit < 1) queryParams.limit = 10;

        // Build filter conditions with proper typing
        const whereConditions: IssueWhereConditions = {};

        // Filter by difficulty (applied to repo)
        if (queryParams.difficulty) {
            whereConditions.repo = {
                ...whereConditions.repo,
                difficulty: queryParams.difficulty,
            };
        }

        // Filter by languages (applied to repo)
        if (queryParams.languages) {
            const languageArray = queryParams.languages
                .split(",")
                .map((lang) => lang.trim().toLowerCase());

            whereConditions.repo = {
                ...whereConditions.repo,
                language: {
                    hasSome: languageArray,
                },
            };
        }

        // Filter by labels (applied to issue)
        if (queryParams.label) {
            const labelArray = queryParams.label
                .split(",")
                .map((label) => label.trim());

            whereConditions.labels = {
                hasSome: labelArray,
            };
        }

        // Search in title and body
        if (queryParams.search) {
            whereConditions.OR = [
                {
                    title: {
                        contains: queryParams.search,
                        mode: "insensitive",
                    },
                },
                {
                    body: {
                        contains: queryParams.search,
                        mode: "insensitive",
                    },
                },
            ];
        }

        // Calculate pagination
        const skip = (queryParams.page - 1) * queryParams.limit;

        // Fetch issues with pagination
        const [issues, totalCount] = await Promise.all([
            prisma.issue.findMany({
                where: whereConditions,
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
                orderBy: {
                    createdAt: "desc",
                },
                skip: skip,
                take: queryParams.limit,
            }),
            prisma.issue.count({
                where: whereConditions,
            }),
        ]);

        // Format response data
        const formattedIssues = issues.map((issue) => ({
            id: issue.id,
            github_id: Number(issue.githubId),
            title: issue.title,
            body: issue.body,
            number: issue.number,
            state: issue.state,
            labels: issue.labels,
            comment_count: issue.comments_count,
            repo: {
                name: issue.repo.name,
                organization: {
                    name: issue.repo.organization.name,
                },
                languages: issue.repo.language,
                difficulty: issue.repo.difficulty,
            },
            createdAt: issue.createdAt,
        }));

        // Calculate pagination metadata
        const totalPages = Math.ceil(totalCount / queryParams.limit);
        const hasNextPage = queryParams.page < totalPages;
        const hasPrevPage = queryParams.page > 1;

        return new Response(
            JSON.stringify({
                success: true,
                data: {
                    issues: formattedIssues,
                    pagination: {
                        currentPage: queryParams.page,
                        totalPages: totalPages,
                        totalCount: totalCount,
                        limit: queryParams.limit,
                        hasNextPage: hasNextPage,
                        hasPrevPage: hasPrevPage,
                    },
                },
                status: 200,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
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
