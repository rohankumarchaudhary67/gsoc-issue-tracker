import { asyncHandler } from "../utils/async-handler";
import { Request, Response } from "express";
import prisma from "@repo/db/db";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";

const add = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const {id} = req.body;
    const user = req.body.user;

    const issue = await prisma.issue.findUnique({
        where: { id },
    });

    if (!issue) {
        return res.status(404).json(
            new ApiError(404, "No issue found")
        );
    }

    try {
        await prisma.userBookmark.create({
            data: {
                userId: user.id,
                issueId: id,
            },
        });

        res.status(200).json(
            new ApiResponse(200, {}, "Bookmark added successfully")
        );
    } catch (error: any) {
        return res.status(500).json(
            new ApiError(500, "Internal server error")
        );
    }
});

const remove = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const {id} = req.body;
    const user = req.body.user;

    const issue = await prisma.issue.findUnique({
        where: { id },
    });

    if (!issue) {
        return res.status(404).json(
            new ApiError(404, "No issue found")
        );
    }

    try {
        await prisma.userBookmark.deleteMany({
            where: {
                userId: user.id,
                issueId: id,
            },
        });

        res.status(200).json(
            new ApiResponse(200, {}, "Bookmark removed successfully")
        );
    } catch (error: any) {
        return res.status(500).json(
            new ApiError(500, "Internal server error")
        );
    }
});

const fetchAll = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const user = req.body.user;

    try {
        const bookmarks = await prisma.userBookmark.findMany({
            where: {
                userId: user.id,
            },
            select: {
                id: true,
                issueId: true,
                createdAt: true,
            },
        });

        if (bookmarks.length === 0) {
            return res.status(400).json(
                new ApiError(400, "No bookmarks available")
            );
        }

        const issuesIds = bookmarks.map((bookmark) => bookmark.issueId);

        const issues = await prisma.issue.findMany({
            where: {
                id: {
                    in: issuesIds,
                },
            },
            select: {
                id: true,
                repository: true,
                url: true,
                number: true,
                title: true,
                state: true,
                comments: true,
                labels: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (issues.length === 0) {
            return res.status(400).json(
                new ApiError(400, "No issues found for the bookmarked issueIds")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, {
                issues,
            }, "Issues fetched based on bookmarks")
        );
    } catch (error: any) {
        return res.status(500).json(
            new ApiError(500, "Internal server error")
        );
    }
});

export { add, remove, fetchAll };