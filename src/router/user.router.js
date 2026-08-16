import { Router } from "express";
import { registerUser } from "../controller/registeruser.controller.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser)

export {userRouter};