import { Router } from "express";
import { add, remove, fetchAll } from "../controllers/bookmark.controller";
import { verifySessionToken } from "../middlewares/auth-verification";

const bookmarkRouter: Router = Router();

bookmarkRouter.post("/add", verifySessionToken, add);
bookmarkRouter.post("/remove", verifySessionToken, remove);
bookmarkRouter.get("/fetchAll", verifySessionToken, fetchAll);

export default bookmarkRouter;