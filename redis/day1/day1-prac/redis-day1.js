import {Redis} from "@upstash/redis";
import dotenv from "dotenv";



dotenv.config();

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
    
});

async function main(){
    console.log("REDIS CLIENT INITIALIZED");

    /**
   * ===========================
   * 1. REDIS STRING
   * ===========================
   */

    await redis.set("username", "ritesh");
    await redis.set("username", "ritesh2");


    const username = await redis.get("username");
    console.log("USERNAME:", username);

    await redis.set("otp", "123456", {
        ex: 60, // expire in 60 seconds
    });
    console.log("Otp set with ttl");


    /**
   * ===========================
   * 2. REDIS QUEUE (FIFO)
   * ===========================
   */


    await redis.rpush("emailQueue" , "user1@gmail.com");
    await redis.rpush("emailQueue" , "user2@gmail.com");

    const emailJob = await redis.lpop("emailQueue");
    console.log("Processing email job for:", emailJob);




    /**
   * ===========================
   * 3. REDIS STACK (LIFO)
   * ===========================
   */

    await redis.lpush("undoStack" , "ACTION_1");
    await redis.lpush("undoStack" , "ACTION_2");

    const lastAction = await redis.lpop("undoStack");
    console.log("Undoing last action:", lastAction);
}
main();
