import { Router } from "express";
import { logoutUser, registerUser, userLogin } from "../controller/registeruser.controller.js";
import { verifyRefreshToken } from "../middleware/verificationjwt.js";
import { refreshAccessToken } from "../controller/refresh.controller.js";
import { useReducer } from "react";

const userRouter = Router();

userRouter.route('/register').post(registerUser);

userRouter.route('/login').post(userLogin);

userRouter.route('/refresh').post(verifyRefreshToken,refreshAccessToken);

userRouter.route('/logout').post(logoutUser);

export {userRouter};