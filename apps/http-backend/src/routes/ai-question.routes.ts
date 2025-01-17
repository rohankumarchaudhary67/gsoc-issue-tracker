import { Router } from "express";
import { askAiQuestion } from "../controllers/ai-question.controller";
import { verifySessionToken } from "../middlewares/auth-verification";

const AIrouter: Router = Router();

AIrouter.post("/ask", verifySessionToken, askAiQuestion);

export default AIrouter;