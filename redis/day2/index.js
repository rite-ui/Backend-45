import Redis from "ioredis";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const client = new Redis(process.env.REDIS_SERVER_URL);
const PORT = process.env.PORT || 3000;

app.use(express.json());


//*SET
app.get("/online/:user", async (req, res)=>{
    await client.sadd("online_users",req.params.user);
    res.json({message: "User is online"});
})

app.get("/online", async (req, res)=>{
    const users = await client.smembers("online_users");
    res.json({online_users: users});
});


app.post("/score", async (req, res)=>{
    const {user, score} = req.body;

    await client.zadd("leaderboard", score, user);
    res.json({message: "Score updated"});
    
});

app.get("/leaderboard", async (req, res)=>{
    const topPlayers = await client.zrevrange("leaderboard", 0, 9, "WITHSCORES");
    res.json({leaderboard: topPlayers});
})


app.post("/orders", async (req, res)=>{
    const {orderId,user, amount} = req.body;

    await client.xadd("orders_stream", "*", "orderId", orderId, "user", user, "amount", amount);
    res.json({message: "Order placed"});
});

app.get("/orders", async (req, res)=>{
    const orders = await client.xrange("orders_stream", "-", "+");
    res.json({orders});
});

app.get("/orders/count", async (req, res)=>{
    const count = await client.xlen("orders_stream");
    res.json({order_count: count});
})

app.get("/", (req, res)=>{
    res.send("Hello World");
});


app.post("/user", async (req, res)=>{
    const {id, name, email, age} = req.body;
     await client.hset(`user:${id}`, "name", name, "email", email, "age", age);
     res.json({message: "User created"});
});

app.get("/user/:id", async (req, res) => {
  const user = await client.hgetall(`user:${req.params.id}`);
  res.json(user);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
