import express from "express"
import cookieParser from "cookie-parser"


const app = express()

app.use(express.json())
app.use(cookieParser())


import { taskrouter } from "./router/task.router.js"
import { userRouter } from "./router/user.router.js"


//user routes
app.use('/api/v1/user',userRouter)


// task routes
app.use('/api/v1/tasks',taskrouter);

export {app}