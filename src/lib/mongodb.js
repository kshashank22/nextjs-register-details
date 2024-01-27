import mongoose from "mongoose";


export const connectMongoDB= async()=>{
    try{
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.q2zgajd.mongodb.net/`);
        console.log("Connected to MongoDB");
    }catch(error){
        console.log("Error connecting to MongoDB: ",error)
    }
}