import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import prisma from '@repo/db/db';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';

const fetchUsage = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const user = req.body.user;

        try {
            const usage = await prisma.user.findUnique({
                where: { id: user.id },
                select: {
                    currentOpenIssue: true,
                    openIssueLimit: true,
                    currentAiQuestion: true,
                    aiQuestionLimit: true,
                    currentPlan: true,
                },
            });

            if (!usage) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'No usage found'));
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(200, usage, 'Usage fetched successfully')
                );
        } catch (error) {
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const upgradeUsage = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {}
);

export { fetchUsage, upgradeUsage };
