import { connectMongoDB } from "./database/index.js";
import { app } from "./app.js";

connectMongoDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`process is running at port ${process.env.PORT}`)
    })
})