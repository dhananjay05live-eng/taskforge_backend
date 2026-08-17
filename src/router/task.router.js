import { Router } from "express";
import { addNewTask, mycurrentTask, thistask,deleteTask, editTask } from "../controller/task.controller.js";
import { verifyJWT } from "../middleware/verificationjwt.js";

const taskrouter = Router();


taskrouter.route('/newtask').post(verifyJWT,addNewTask)


//SECURED ROUTES

taskrouter.route('/mytask').get(verifyJWT,mycurrentTask)
taskrouter.route('/:id').get(verifyJWT,thistask)
                        .patch(verifyJWT,editTask)
                        .delete(verifyJWT,deleteTask)


export {taskrouter}

