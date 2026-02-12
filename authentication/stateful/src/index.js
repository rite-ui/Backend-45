import dotenv from "dotenv";
import {app} from "./app.js";
import {connectDB} from "./config/db.config.js"


dotenv.config();




connectDB();


app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:3000`);
})