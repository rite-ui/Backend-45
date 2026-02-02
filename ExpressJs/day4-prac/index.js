import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth.route.js";
import taskRoutes from "./Routes/task.route.js";


const app = express();
app.use(express.json());
app.use(cookieParser("codebyRitesh"));

app.use(
    session(
        {
            secret: "mySecret",
            saveUninitialized: false,
            resave: false,
            cookie:{
                maxAge: 1000 * 60 * 60 * 24
            }

        }
    ));


app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/task" , taskRoutes)

app.listen(3000,(req, res)=>{
    console.log("server is up and fine");
});