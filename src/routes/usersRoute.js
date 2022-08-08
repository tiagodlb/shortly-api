import { Router } from "express";

import { postSignUp,postSignIn } from "../controllers/authController";
import { userExists, emailExists, ValidateUserExistance} from "../middlewares/usersMiddleware.js";
import { ValidateSession } from "../middlewares/sessionMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", emailExists, postSignUp);
userRouter.post("/signin", userExists, ValidateUserExistance, postSignIn);
userRouter.get('/users/me', ValidateSession, getUsersMe);

export default userRouter;
