import { Response, Request, NextFunction } from "express";
import { asyncHandler } from "../utils/async-handler";
import { ApiError } from "../utils/api-error";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
    email: string;
}

const verifySessionToken = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sessionToken = req.header("Authorization")?.replace("Bearer ", "");

            if (!sessionToken) {
                throw new ApiError(400, "Authentication required");
            }

            const decodedToken = jwt.verify(sessionToken, process.env.SESSION_TOKEN_SECRET!) as DecodedToken;

            req.body.email = decodedToken.email;

            next();

        } catch (error: any) {
            throw new ApiError(400, "Internal server error")
        }
    }
)

export { verifySessionToken }