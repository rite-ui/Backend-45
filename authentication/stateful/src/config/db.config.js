import mongoose, { connect } from "mongoose";

 export const connectDB = async ()=>{
    try{

        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongodb connected succesfully");
    }catch(error){
        console.log("❌ MongoDB connection error:",error)
        process.exit(1);
    }
}