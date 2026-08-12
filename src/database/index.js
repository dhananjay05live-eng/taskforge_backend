import mongoose from "mongoose";

const connectMongoDB = async()=>{
try {
        const connection_instance = await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.ii12sxl.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`)
        console.log(`MONGO DB CONNECTED SUCCESSFULLY!!!`)
} catch (error) {
    console.log("MONGO DB CONNECTION FAILED !!",error)
}
}

export {connectMongoDB}