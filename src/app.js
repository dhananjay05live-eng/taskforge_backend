import express from "express"
const app = express()

app.get('/',(req,res)=>{
    res.send({"message":"taskforce is alive"})
})

app.listen(process.env.PORT||8000,()=>{
    console.log(`express app is listening `)
})

export {app}