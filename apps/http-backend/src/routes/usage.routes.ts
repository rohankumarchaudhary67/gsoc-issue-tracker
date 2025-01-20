import { Router } from 'express';
import { fetchUsage, upgradeUsage } from '../controllers/upgrade.controller';
import { verifySessionToken } from '../middlewares/auth-verification';

const usageRouter: Router = Router();

usageRouter.get('/fetch', verifySessionToken, fetchUsage);
usageRouter.post('/upgrade', verifySessionToken, upgradeUsage);

export default usageRouter;
