import express from "express"


const app = express()

app.use(express.json())


import { taskrouter } from "./router/task.router.js"

// task routes
app.use('/api/v1/tasks',taskrouter);

export {app}