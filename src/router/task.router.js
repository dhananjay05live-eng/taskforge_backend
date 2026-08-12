import { Router } from "express";
import { addNewTask } from "../controller/task.controller.js";

const taskrouter = Router();


taskrouter.route('/newtask').post(addNewTask)



export {taskrouter}

