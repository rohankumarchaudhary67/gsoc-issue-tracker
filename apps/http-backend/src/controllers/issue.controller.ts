import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import prisma from "@repo/db/db";
import { ApiResponse } from "../utils/api-response";
import { ApiError } from "../utils/api-error";

const fetchAll = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const issues = await prisma.issue.findMany({
            select: {
                id: true,
                repository: true,
                url: true,
                number: true,
                title: true,
                state: true,
                comments: true,
                labels: true,
                createdAt: true
            }
        });
        if (issues.length <= 0) {
            return res.status(200).json(
                new ApiError(200, "No issue avilable")
            )
        }
        return res.status(200).json(
            new ApiResponse(200, issues, "Issues fetched")
        )
    }
)

const fetch = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { email, id } = req.body;

    // Fetch user and validate open issue limit
    const user = await prisma.user.findUnique({
        where: { email },
        select: { currentOpenIssue: true, openIssueLimit: true }
    });

    if (!user) {
        return res.status(404).json(new ApiError(404, "User not found"));
    }

    if (user.currentOpenIssue !== undefined && user.currentOpenIssue >= user.openIssueLimit) {
        return res.status(400).json(new ApiError(400, "Buy premium to increase the issue limit"));
    }

    // Fetch the issue details
    const issue = await prisma.issue.findUnique({
        where: { id },
        select: {
            id: true,
            repository: true,
            url: true,
            number: true,
            title: true,
            state: true,
            body: true,
            comments: true,
            labels: true,
            createdAt: true,
            updatedAt: true
        }
    });

    if (!issue) {
        return res.status(404).json(new ApiError(404, "No issue found"));
    }

    // Update the user's open issue limit
    await prisma.user.update({
        where: { email },
        data: { openIssueLimit: user.openIssueLimit + 1 }
    });

    // Send the response
    return res.status(200).json(new ApiResponse(200, issue, "Issue fetched successfully"));
});


export { fetchAll, fetch }