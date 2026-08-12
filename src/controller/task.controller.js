import { Task } from "../models/tasks.models.js";




const addNewTask = async(req,res)=>{
   try {
     const {title,description,status,priority} =  req.body
     const new_task =  await Task.create({title:title,description:description,status:status,priority:priority});

     return res
     .status(201)
     .json({message:"task created successfully",
        data: new_task
     });
   } catch (error) {
    console.log("something went wrong while creating task",error)
    return res
    .status(500)
    .json({
        message:"failed to create task"
    });
   }
}


export {addNewTask}