import { Router } from "express";

import { postSignUp } from "../controllers/userController.js";
import { userExists, emailExists, ValidateUserExistance} from "../middlewares/usersMiddleware.js";
import { ValidateSession } from "../middlewares/sessionMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", emailExists, postSignUp);
userRouter.post("/signup", userExists, ValidateUserExistance, postSignUp);
userRouter.get('/users/me', ValidateSession, getUsersMe);

export default userRouter;
