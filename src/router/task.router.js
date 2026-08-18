import { Router } from "express";
import { addNewTask, mycurrentTask, thistask,deleteTask, editTask } from "../controller/task.controller.js";
import { verifyAccess,verifyRefreshToken } from "../middleware/verificationjwt.js";

const taskrouter = Router();


taskrouter.route('/newtask').post(verifyAccess,addNewTask)


//SECURED ROUTES

taskrouter.route('/mytask').get(verifyAccess,mycurrentTask)
taskrouter.route('/:id').get(verifyAccess,thistask)
                        .patch(verifyAccess,editTask)
                        .delete(verifyAccess,deleteTask)


export {taskrouter}

