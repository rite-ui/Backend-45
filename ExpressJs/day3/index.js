import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

const app = express();

dotenv.config();

app.use(cookieParser(process.env.COOKIE_SECRET))

// How You can set cookies
app.get("/set-cookies",(req,res)=>{
    res.cookie("Name", "satyam",{
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    signed: true, // signed cookie
    httpOnly: true, // can't be accessed by JS
    secure: true, // HTTPS only
    path: "/", // URL path where cookie is accessible
    sameSite: "lax", // CSRF protection // assignment
    });


    res.send("cookie has been sent!");
})

app.get("/read-cookies", (req, res)=>{
    // const rawCookies = req.headers.cookie; //Bad approach

    const parsedCookie = req.cookies.theme;
    console.log(req.signedCookies)

    
  res.json({
    data: req.signedCookies,
  });
})

app.listen(3000,(req,res)=>{
    console.log("server is running");
})