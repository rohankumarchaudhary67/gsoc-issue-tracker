import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(
    express.json({
        limit: "16kb",
    })
);

app.use(
    express.urlencoded({
        limit: "16kb",
        extended: true,
    })
);

app.use(express.static("public"));

app.use(cookieParser());


// Import routes
import healthCheckRouter from "./routes/health-check.routes";
import issueRouter from "./routes/issue.routes";

// Routes declaration
app.use("/api/v1/health-check", healthCheckRouter);
app.use("/api/v1/issue", issueRouter)

export default app;