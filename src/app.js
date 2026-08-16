import express from "express"


const app = express()

app.use(express.json())


import { taskrouter } from "./router/task.router.js"
import { userRouter } from "./router/user.router.js"


//user routes
app.use('/api/v1/user',userRouter)


// task routes
app.use('/api/v1/tasks',taskrouter);

export {app}