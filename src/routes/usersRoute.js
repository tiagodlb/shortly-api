import { Router } from "express";

import { postSignUp } from "../controllers/userController.js";
import { ValidateUser } from "../middlewares/usersMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", ValidateUser, postSignUp);

export default userRouter;
