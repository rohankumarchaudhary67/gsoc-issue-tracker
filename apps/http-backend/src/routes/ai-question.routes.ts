import { Router } from "express";
import { askAiQuestionWithIssue, askAiQuestionWithoutIssue } from "../controllers/ai-question.controller";
import { verifySessionToken } from "../middlewares/auth-verification";

const AIrouter: Router = Router();

AIrouter.post("/askWithIssue", verifySessionToken, askAiQuestionWithIssue);
AIrouter.post("/askWithoutIssue", verifySessionToken, askAiQuestionWithoutIssue);

export default AIrouter;