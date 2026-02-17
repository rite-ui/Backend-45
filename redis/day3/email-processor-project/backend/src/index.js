import express from "express";
import cors from "cors";
import { config } from "./config.js";

const app = express();

app.use(cors());
app.use(express.json());



app.get("/api/health" , (req , res)=>{
      res.json({ ok: true, service: 'email-processor' });
});


app.listen(config.port , ()=>{
    console.log(`Server is running at http://localhost:${config.port}`)
});