import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();


// Global Middleware - applies to all routes

const logReq = (req , res , next)=>{
    console.log(req.url, req.method)
    next();
}

// app.use(logReq)

app.get("/ping", (req, res) => {
  res.send("Pong❤️");
});

app.get (
    "/hello",
    logReq,
    (req, res, next)=>{
        console.log("going from second midlleware");
        next();
    },

     (req , res)=>{
    res.send("world🌎");
})


app.use("/api/v1/user",userRouter);


app.listen(3000,(req,res)=>{
    console.log("server is up and running🐇");
});


// Use cases of middleware

// 1. auth
// 2. error;
// 3. protected
// 4. validation
// 5. parse
// 6. rate limiting
// 7. compression
// 8. cors