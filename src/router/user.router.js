import { Router } from "express";
import { registerUser, userLogin } from "../controller/registeruser.controller.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser)

userRouter.route('/login').post(userLogin)

export {userRouter};