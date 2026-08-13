import { Task } from "../models/tasks.models.js";




const addNewTask = async(req,res)=>{
   try {
     const {title,description,status,priority,dueDate} =  req.body
     const new_task =  await Task.create({title:title,description:description,status:status,priority:priority,dueDate:dueDate});

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

const mycurrentTask = async(req,res)=>{

   
try {
   let date = req.query.date;

   if (!date) {
       date = new Date();
   }
      const startOfDay = new Date(date);
      startOfDay.setHours(0,0,0,0);
      const startOfNextDay = new Date(startOfDay);
      startOfNextDay.setDate(startOfNextDay.getDate()+1);
      const tasks = await Task.find({dueDate:{$gte:startOfDay, $lt:startOfNextDay}})
   
      if(tasks.length>0){
         return res
         .status(200)
         .json({
            "message":"tasks are retrived successfully",
            "tasks":tasks
         })
      }
      else{
         return res
         .status(200)
         .json({"message":"No tasks pending!"})
      }
} catch (error) {
   console.log('could not retrive data successfully',error)
   return res
   .status(500)
   .json({
      "message": "No tasks found for this date",
      "tasks": []
  })
   }
}


export {addNewTask,mycurrentTask}