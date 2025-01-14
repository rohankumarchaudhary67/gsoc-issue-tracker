import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

const healthcheck = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const response = new ApiResponse(
            200,
            null,
            "Service is up and running"
        );
        res.status(response.statusCode).json(response);
    }
);

export { healthcheck };