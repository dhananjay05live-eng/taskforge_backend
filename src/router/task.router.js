import { Router } from "express";
import { addNewTask, mycurrentTask, thistask,deleteTask, editTask } from "../controller/task.controller.js";

const taskrouter = Router();


taskrouter.route('/newtask').post(addNewTask)

taskrouter.route('/mytask').get(mycurrentTask)
taskrouter.route('/:id').get(thistask)
                        .patch(editTask)
                        .delete(deleteTask)


export {taskrouter}

