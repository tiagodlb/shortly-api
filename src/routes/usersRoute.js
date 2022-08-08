import { Router } from "express";

import { postSignUp, postSignIn } from "../controllers/authController.js";
import { getUserMe } from "../controllers/userController.js";
import {
  userExists,
  emailExists,
  ValidateLoginCompatibility,
} from "../middlewares/usersMiddleware.js";
import { ValidateSession } from "../middlewares/sessionMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", emailExists, postSignUp);
userRouter.post("/signin", userExists, ValidateLoginCompatibility, postSignIn);
userRouter.get("/users/me", ValidateSession, getUserMe);

export default userRouter;
