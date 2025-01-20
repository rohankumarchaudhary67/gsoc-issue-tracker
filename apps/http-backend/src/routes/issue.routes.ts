import { Router } from 'express';
import { fetchAll, fetch } from '../controllers/issue.controller';
import { verifySessionToken } from '../middlewares/auth-verification';

const issueRouter: Router = Router();

issueRouter.get('/fetchAll', verifySessionToken, fetchAll);
issueRouter.post('/fetch', verifySessionToken, fetch);

export default issueRouter;
