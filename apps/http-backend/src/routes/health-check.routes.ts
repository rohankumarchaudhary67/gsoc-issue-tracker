import { Router } from "express";
import { healthcheck } from "../controllers/health-check.controller";

const healthCheckRouter = Router();

healthCheckRouter.get("/", healthcheck);

export default healthCheckRouter;