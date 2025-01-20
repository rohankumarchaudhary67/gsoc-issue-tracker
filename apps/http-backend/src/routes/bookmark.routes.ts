import { Router } from 'express';
import { toggleBookmark, fetchAll } from '../controllers/bookmark.controller';
import { verifySessionToken } from '../middlewares/auth-verification';

const bookmarkRouter: Router = Router();

bookmarkRouter.post('/toggleBookmark', verifySessionToken, toggleBookmark);
bookmarkRouter.get('/fetchAll', verifySessionToken, fetchAll);

export default bookmarkRouter;
