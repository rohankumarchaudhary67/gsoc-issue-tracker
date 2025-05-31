import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
    }; // present if the issue is a PR
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

        // Fetch issues from GitHub
        const issues = await fetchGitHubIssues();

        // Store issues in database
        const savedCount = await storeIssuesInDatabase(issues);

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

async function fetchGitHubIssues(): Promise<GitHubIssue[]> {
    const repos = process.env.GITHUB_REPOS?.split(",") || [];
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        throw new Error("GITHUB_TOKEN environment variable is required");
    }

    if (repos.length === 0) {
        throw new Error("GITHUB_REPOS environment variable is required");
    }

    const allIssues: GitHubIssue[] = [];

    for (const repo of repos) {
        const [owner, repoName] = repo.trim().split("/");

        if (!owner || !repoName) {
            console.warn(
                `Invalid repo format: ${repo}. Expected format: owner/repo`
            );
            continue;
        }

        try {
            // Fetch ONLY open, unassigned issues from GitHub API
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
                throw new Error(
                    `GitHub API error: ${response.status} ${response.statusText}`
                );
            }

            const issues = (await response.json()) as GitHubIssue[];

            // Filter out pull requests (GitHub API returns PRs as issues)
            // Also double-check that assignees array is empty (extra safety)
            const actualIssues = issues.filter(
                (issue: GitHubIssue) =>
                    !issue.pull_request &&
                    issue.assignees.length === 0 &&
                    issue.state === "open"
            );

            // Add repo information to each issue
            const issuesWithRepo = actualIssues.map((issue: GitHubIssue) => ({
                ...issue,
                repository: {
                    owner: owner,
                    name: repoName,
                    full_name: `${owner}/${repoName}`,
                },
            }));

            allIssues.push(...issuesWithRepo);

            console.log(
                `Fetched ${actualIssues.length} open, unassigned issues from ${owner}/${repoName}`
            );
        } catch (error) {
            console.error(
                `Error fetching issues from ${owner}/${repoName}:`,
                error
            );
            // Continue with other repos even if one fails
        }
    }

    return allIssues;
}

async function storeIssuesInDatabase(issues: GitHubIssue[]): Promise<number> {
    let savedCount = 0;

    for (const issue of issues) {
        try {
            const [owner, repoName] = issue.repository.full_name.split("/");

            // First, ensure the organization exists
            let organization = await prisma.organization.findUnique({
                where: { name: owner },
            });

            if (!organization) {
                organization = await prisma.organization.create({
                    data: {
                        name: owner,
                        description: `GitHub organization: ${owner}`,
                    },
                });
                console.log(`Created organization: ${owner}`);
            }

            // Then, ensure the repository exists
            let repo = await prisma.repo.findFirst({
                where: {
                    name: repoName,
                    organizationId: organization.id,
                },
            });

            if (!repo) {
                // You might want to fetch additional repo info from GitHub API here
                // For now, we'll create with minimal info
                repo = await prisma.repo.create({
                    data: {
                        name: repoName,
                        organizationId: organization.id,
                        language: [], // You could fetch this from GitHub API
                        difficulty: "EASY", // Default difficulty
                    },
                });
                console.log(`Created repo: ${owner}/${repoName}`);
            }

            // Check if issue already exists
            const existingIssue = await prisma.issue.findUnique({
                where: { githubId: BigInt(issue.id) },
            });

            const issueData = {
                githubId: BigInt(issue.id),
                number: issue.number,
                title: issue.title,
                body: issue.body || "",
                state: issue.state,
                html_url: issue.html_url,
                comments_count: issue.comments,
                labels: issue.labels.map((label) => label.name),
                repoId: repo.id,
            };

            if (existingIssue) {
                // Update existing issue
                await prisma.issue.update({
                    where: { githubId: BigInt(issue.id) },
                    data: issueData,
                });
            } else {
                // Create new issue
                await prisma.issue.create({
                    data: issueData,
                });
            }

            // Update organization's open issues count
            await prisma.organization.update({
                where: { id: organization.id },
                data: {
                    openIssues: {
                        increment: existingIssue ? 0 : 1,
                    },
                },
            });

            savedCount++;
        } catch (error) {
            console.error(`Error saving issue ${issue.id}:`, error);
            // Continue with other issues even if one fails
        }
    }

    return savedCount;
}
