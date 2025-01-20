import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import prisma from '@repo/db/db';
import { ApiResponse } from '../utils/api-response';
import { ApiError } from '../utils/api-error';

const fetchAll = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const user = req.body.user;

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 100;

        const skip = (page - 1) * limit;

        try {
            const issues = await prisma.issue.findMany({
                skip: skip,
                take: limit,
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
                },
            });

            if (issues.length === 0) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'No issues available'));
            }

            return res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        issues,
                        pagination: {
                            page,
                            limit,
                        },
                    },
                    'Issues fetched'
                )
            );
        } catch (error: any) {
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const fetch = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body;
        const user = req.body.user;

        if (user.currentOpenIssue >= user.openIssueLimit) {
            return res
                .status(400)
                .json(new ApiError(400, 'free trial limit reached'));
        }

        try {
            const issue = await prisma.issue.findUnique({
                where: { id },
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
                    // Instead of fetching bookmarks, just check if the issue is bookmarked by the user
                    bookmarks: {
                        where: {
                            userId: user.id,
                        },
                        select: {
                            id: true,
                        },
                    },
                },
            });

            if (!issue) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'No issue found'));
            }

            const isBookmarked = issue.bookmarks.length > 0;

            await prisma.user.update({
                where: { id: user.id },
                data: { currentOpenIssue: user.currentOpenIssue + 1 },
            });

            // Include isBookmarked flag in the response
            res.status(200).json(
                new ApiResponse(
                    200,
                    { ...issue, isBookmarked },
                    'Issue fetched successfully'
                )
            );
        } catch (error: any) {
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

export { fetchAll, fetch };
