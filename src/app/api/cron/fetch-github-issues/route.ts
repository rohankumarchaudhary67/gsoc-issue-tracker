import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import repoList from "@/data/repo";

interface GitHubIssue {
    id: number;
    number: number;
    title: string;
    body: string;
    state: string;
    user: {
        login: string;
        avatar_url: string;
    };
    repository: {
        owner: string;
        name: string;
        full_name: string;
    };
    labels: { name: string }[];
    assignees: { login: string }[];
    created_at: string;
    updated_at: string;
    closed_at?: string | null;
    html_url: string;
    comments: number;
    pull_request?: {
        url: string;
        html_url: string;
        diff_url: string;
        patch_url: string;
    };
}

// For App Router
export async function GET(request: NextRequest) {
    try {
        // Verify the request is from Vercel Cron
        const authHeader = request.headers.get("authorization");
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        console.log(
            "Starting GitHub issues fetch job at:",
            new Date().toISOString()
        );

        // Fetch issues from GitHub (parallel processing)
        const issues = await fetchGitHubIssuesParallel();

        // Store issues in database (batch processing)
        const savedCount = await storeIssuesInDatabaseBatch(issues);

        console.log(`Successfully processed ${savedCount} issues`);

        return NextResponse.json({
            success: true,
            message: `Processed ${savedCount} issues`,
            timestamp: new Date().toISOString(),
        });
    } catch (error: unknown) {
        console.error("Cron job failed:", error);

        const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";

        return NextResponse.json(
            {
                error: "Cron job failed",
                message: errorMessage,
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}

async function fetchGitHubIssuesParallel(): Promise<GitHubIssue[]> {
    const repos = repoList;
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        throw new Error("GITHUB_TOKEN environment variable is required");
    }

    if (repos.length === 0) {
        throw new Error("GITHUB_REPOS environment variable is required");
    }

    // Process all repos in parallel
    const promises = repos.map(async (repo) => {
        const [owner, repoName] = repo.trim().split("/");

        if (!owner || !repoName) {
            console.warn(
                `Invalid repo format: ${repo}. Expected format: owner/repo`
            );
            return [];
        }

        try {
            const response = await fetch(
                `https://api.github.com/repos/${owner}/${repoName}/issues?state=open&assignee=none&per_page=100&sort=updated&direction=desc`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/vnd.github+json",
                        "X-GitHub-Api-Version": "2022-11-28",
                        "User-Agent": "your-app-name",
                    },
                }
            );

            if (!response.ok) {
                console.error(
                    `GitHub API error for ${owner}/${repoName}: ${response.status} ${response.statusText}`
                );
                return [];
            }

            const issues = (await response.json()) as GitHubIssue[];

            // Filter out pull requests and add repo info
            const actualIssues = issues
                .filter(
                    (issue: GitHubIssue) =>
                        !issue.pull_request &&
                        issue.assignees.length === 0 &&
                        issue.state === "open"
                )
                .map((issue: GitHubIssue) => ({
                    ...issue,
                    repository: {
                        owner: owner,
                        name: repoName,
                        full_name: `${owner}/${repoName}`,
                    },
                }));

            console.log(
                `Fetched ${actualIssues.length} open, unassigned issues from ${owner}/${repoName}`
            );

            return actualIssues;
        } catch (error) {
            console.error(
                `Error fetching issues from ${owner}/${repoName}:`,
                error
            );
            return [];
        }
    });

    // Wait for all API calls to complete
    const results = await Promise.allSettled(promises);

    // Flatten results and filter out failed ones
    return results
        .filter(
            (result): result is PromiseFulfilledResult<GitHubIssue[]> =>
                result.status === "fulfilled"
        )
        .flatMap((result) => result.value);
}

async function storeIssuesInDatabaseBatch(
    issues: GitHubIssue[]
): Promise<number> {
    if (issues.length === 0) return 0;

    try {
        // Step 1: Get unique organizations and repos
        const uniqueOrgs = [
            ...new Set(issues.map((issue) => issue.repository.owner)),
        ];
        const uniqueRepos = [
            ...new Set(issues.map((issue) => issue.repository.full_name)),
        ];

        // Step 2: Batch create/find organizations
        const orgMap = new Map<string, string>(); // orgName -> orgId

        for (const orgName of uniqueOrgs) {
            let org = await prisma.organization.findUnique({
                where: { name: orgName },
            });

            if (!org) {
                org = await prisma.organization.create({
                    data: {
                        name: orgName,
                        description: `GitHub organization: ${orgName}`,
                    },
                });
                console.log(`Created organization: ${orgName}`);
            }

            orgMap.set(orgName, org.id);
        }

        // Step 3: Batch create/find repositories
        const repoMap = new Map<string, string>(); // fullName -> repoId

        for (const fullName of uniqueRepos) {
            const [owner, repoName] = fullName.split("/");
            const orgId = orgMap.get(owner);

            if (!orgId) continue;

            let repo = await prisma.repo.findFirst({
                where: {
                    name: repoName,
                    organizationId: orgId,
                },
            });

            if (!repo) {
                repo = await prisma.repo.create({
                    data: {
                        name: repoName,
                        organizationId: orgId,
                        language: [],
                        difficulty: "EASY",
                    },
                });
                console.log(`Created repo: ${fullName}`);
            }

            repoMap.set(fullName, repo.id);
        }

        // Step 4: Get existing issues in one query
        const githubIds = issues.map((issue) => BigInt(issue.id));
        const existingIssues = await prisma.issue.findMany({
            where: {
                githubId: { in: githubIds },
            },
            select: { githubId: true },
        });

        const existingIssueIds = new Set(
            existingIssues.map((issue) => issue.githubId.toString())
        );

        // Step 5: Prepare data for batch operations
        const issuesToCreate = [];
        const issuesToUpdate = [];
        const orgIssueCountUpdates = new Map<string, number>();

        for (const issue of issues) {
            const repoId = repoMap.get(issue.repository.full_name);
            if (!repoId) continue;

            const issueData = {
                githubId: BigInt(issue.id),
                number: issue.number,
                title: issue.title,
                body: issue.body || "",
                state: issue.state,
                html_url: issue.html_url,
                comments_count: issue.comments,
                labels: issue.labels.map((label) => label.name),
                repoId: repoId,
            };

            if (existingIssueIds.has(issue.id.toString())) {
                issuesToUpdate.push({
                    where: { githubId: BigInt(issue.id) },
                    data: issueData,
                });
            } else {
                issuesToCreate.push(issueData);

                // Count new issues per organization
                const orgId = orgMap.get(issue.repository.owner);
                if (orgId) {
                    orgIssueCountUpdates.set(
                        orgId,
                        (orgIssueCountUpdates.get(orgId) || 0) + 1
                    );
                }
            }
        }

        // Step 6: Execute batch operations
        let savedCount = 0;

        // Batch create new issues
        if (issuesToCreate.length > 0) {
            const batchSize = 100; // Adjust based on your needs
            for (let i = 0; i < issuesToCreate.length; i += batchSize) {
                const batch = issuesToCreate.slice(i, i + batchSize);
                await prisma.issue.createMany({
                    data: batch,
                    skipDuplicates: true,
                });
                savedCount += batch.length;
            }
        }

        // Batch update existing issues
        if (issuesToUpdate.length > 0) {
            await prisma.$transaction(
                issuesToUpdate.map((update) => prisma.issue.update(update))
            );
            savedCount += issuesToUpdate.length;
        }

        // Update organization issue counts
        if (orgIssueCountUpdates.size > 0) {
            const orgUpdatePromises = Array.from(
                orgIssueCountUpdates.entries()
            ).map(([orgId, count]) =>
                prisma.organization.update({
                    where: { id: orgId },
                    data: { openIssues: { increment: count } },
                })
            );
            await Promise.all(orgUpdatePromises);
        }

        return savedCount;
    } catch (error) {
        console.error("Error in batch database operations:", error);
        throw error;
    }
}
