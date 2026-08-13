import { Router } from "express";
import { addNewTask, mycurrentTask } from "../controller/task.controller.js";

const taskrouter = Router();


taskrouter.route('/newtask').post(addNewTask)

taskrouter.route('/mytask').get(mycurrentTask)



export {taskrouter}

