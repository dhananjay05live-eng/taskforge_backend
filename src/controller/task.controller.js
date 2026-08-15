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
   let {date,priority,status} = req.query;

   if (!date) {
       date = new Date();
   }
      const startOfDay = new Date(date);
      startOfDay.setHours(0,0,0,0);
      const startOfNextDay = new Date(startOfDay);
      startOfNextDay.setDate(startOfNextDay.getDate()+1);

      const filter = {dueDate:{$gte:startOfDay,$lt:startOfNextDay}};

      if(priority){
         filter.priority = priority;
      }
      if(status){
         filter.status =status;
      }

      const tasks = await Task.find(filter);
   
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
         .json({
            "message": "No tasks found",
            "tasks": []
        })
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

const thistask  = async(req,res)=>{
   try {
      const thistask = await Task.findById(req.params.id);

      if(thistask === null){
         return res.status(200)
            .json({"message":"task does not exist"})
         
      }
      return res
      .status(200)
      .json({"message":"task retrival successful",
         "task":thistask
      })
   } catch (error) {
      console.log("could not find the task",error)
      return res.status(500)
      .json({"error message":error})
   }

}

const deleteTask = async(req,res)=>{

try {
      const id = req.params.id;
      const deletedTask = await Task.findByIdAndDelete(id);

      if (deletedTask === null) {
         return res
             .status(404)
             .json({
                 "message": "task not found"
             });
     }

      return res.status(200)
                  .json({"message":"task deleted successfully",
                     "deleted":deletedTask
                  })
} catch (error) {
   return res.status(500)
               .json({"message":"could not delete task",
                  "error":error
               })
}
}

const editTask = async(req,res)=>{

try {
      const allowedFields = ["title","description","status","priority","dueDate"];
      const update = {};
      for(const field of allowedFields){
         if(req.body[field]!==null && req.body[field]!==undefined){
            update[field] = req.body[field];
         }
      }
      if(Object.keys(update).length === 0){
         return res
                  .status(200)
                  .json({"message":"no updates recieved"})
   
      }
      const updatedTask = await Task.findOneAndUpdate( {_id: req.params.id},update,{ returnDocument: "after" });
   
      return res
               .status(200)
               .json({"message":"task updated successfully",
                  "updated task":updatedTask
               })
   
} catch (error) {
   return res
            .status(500)
            .json({"message":"could not fetch updates",
               "error":error
            })
}
  


}


export {addNewTask,mycurrentTask,thistask,deleteTask,editTask}



/*
const updateTaskStatus = async (req,res)=>{
   try {
      const {status} = req.body;
      const update = {status};
      const new_status =await Task.findByIdAndUpdate(req.params.id,update, { returnDocument: "after" });

      return res.status(200)
               .json({"message":"task updated successfully",
                  "status":new_status
               })
   } catch (error) {
      console.log("status updation failed",error);

      return res
         .status(400)
         .json({"message":"problem in status updation"})
   }
}
*/


/*
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
      
         if(tasks.length<0){
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
   }*/