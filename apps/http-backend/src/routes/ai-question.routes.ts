import { Router } from 'express';
import { askAiQuestionWithIssue } from '../controllers/ai-question.controller';
import { verifySessionToken } from '../middlewares/auth-verification';

const AIrouter: Router = Router();

AIrouter.post('/askWithIssue', verifySessionToken, askAiQuestionWithIssue);

export default AIrouter;
