import { Router } from "express";
import { addNewTask, mycurrentTask, thistask,updateTaskStatus,deleteTask } from "../controller/task.controller.js";

const taskrouter = Router();


taskrouter.route('/newtask').post(addNewTask)

taskrouter.route('/mytask').get(mycurrentTask)
taskrouter.route('/:id').get(thistask)
                        .patch(updateTaskStatus)
                        .delete(deleteTask)


export {taskrouter}

