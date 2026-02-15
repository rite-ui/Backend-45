# 📘 Redis – Chapter 1 (Day 1)

## 1️⃣ What is Redis?

**Redis** stands for **RE**mote **DI**ctionary **S**erver.

At its core:

* Redis is an **in-memory data store**
* Data is stored in **RAM**, not on disk
* Extremely **fast** (microseconds)
* Key → Value based, but values can be **advanced data structures**

👉 Think of Redis as:

> “A super-fast in-memory database for temporary or frequently used data”

---

## 2️⃣ Why do we even need Redis?

Let’s start with a **real backend problem** 👇

### ❌ Problem without Redis

```txt
Client → Backend → Database → Backend → Client
```

Every request:

* Hits the database
* Database does disk I/O
* Slower response
* High traffic = DB bottleneck 💥

Example:

* Fetch user profile
* Fetch product list
* Fetch leaderboard
* Fetch dashboard stats

Same queries… again and again.

---

### ✅ Solution with Redis

```txt
Client → Backend → Redis (cache) → Client
                ↓ (cache miss)
               Database
```

Redis:

* Stores **frequently accessed data**
* Serves data **without hitting DB**
* Reduces DB load
* Improves response time massively

📌 **Key idea**:

> Redis is used when *speed matters more than permanent storage*

---

## 3️⃣ What exact problems does Redis solve?

### 1. Caching

* User sessions
* API responses
* Computed results

### 2. Rate Limiting

* Limit login attempts
* Prevent API abuse

### 3. Queues

* Background jobs
* Email sending
* Notifications

### 4. Real-time data

* Live counters
* Online users
* Leaderboards

### 5. Temporary storage

* OTPs
* Verification tokens
* Expiring data

---

## 4️⃣ Why Redis is fast?

✅ In-memory (RAM)
✅ Single-threaded (no locking issues)
✅ Optimized data structures
✅ Simple protocol

> Redis trades **durability** for **speed**

---

## 5️⃣ Redis vs Traditional Database

| Feature    | Redis                  | SQL / MongoDB   |
| ---------- | ---------------------- | --------------- |
| Storage    | RAM                    | Disk            |
| Speed      | ⚡ Very fast            | Slower          |
| Use case   | Cache, queue, realtime | Persistent data |
| Data size  | Smaller                | Large           |
| Durability | Optional               | Strong          |

👉 Redis **does NOT replace DB**
👉 Redis **complements DB**

---

## 6️⃣ Services like Redis

You’ll mention this briefly (no deep dive today):

* Redis Cloud
* AWS ElastiCache
* Azure Cache for Redis
* **Upstash** (we’ll use this ✅)

---

## 7️⃣ Why Upstash Redis?

You *don’t* want Docker today 👇

Upstash:

* Serverless Redis
* No Docker, no infra
* Works perfectly with Node.js
* Free tier for learning
* HTTPS based (REST + Redis protocol)

---

## 8️⃣ Setting up Upstash Redis

### Step 1: Create Redis Database

1. Go to **upstash.com**
2. Create account
3. Create **Redis database**
4. Copy:

   * `REDIS_URL`
   * `REDIS_TOKEN`

---

## 9️⃣ Connecting Redis in Node.js (No Docker)

### Install client

```bash
npm install @upstash/redis
```

### Create redis client

```js
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});
```

---

## 🔑 Redis Data Types (Today’s Focus)

We’ll cover:

1. **String**
2. **Queue**
3. **Stack**

---

## 1️⃣ Redis String

Most basic type.

### Set a value

```js
await redis.set("username", "codesnippet");
```

### Get a value

```js
const user = await redis.get("username");
console.log(user); // codesnippet
```

### Set with expiry (TTL)

```js
await redis.set("otp", "123456", { ex: 60 }); // expires in 60 sec
```

### Use case

* Caching user data
* OTPs
* Tokens

---

## 2️⃣ Redis as a Queue (FIFO)

Queue = **First In First Out**

Redis uses **List** internally.

### Push to queue

```js
await redis.rpush("emailQueue", "user1@gmail.com");
await redis.rpush("emailQueue", "user2@gmail.com");
```

### Consume from queue

```js
const email = await redis.lpop("emailQueue");
console.log(email);
```

### Flow

```txt
Producer → Redis Queue → Consumer
```

### Use case

* Background jobs
* Email sending
* Notifications

---

## 3️⃣ Redis as a Stack (LIFO)

Stack = **Last In First Out**

### Push to stack

```js
await redis.lpush("undoStack", "ACTION_1");
await redis.lpush("undoStack", "ACTION_2");
```

### Pop from stack

```js
const action = await redis.lpop("undoStack");
console.log(action); // ACTION_2
```

### Use case

* Undo/Redo
* History tracking
* Recent activity

---

## 🧠 Mental Model (Very Important)

| Structure | Redis Command | Order        |
| --------- | ------------- | ------------ |
| String    | SET / GET     | Single value |
| Queue     | RPUSH + LPOP  | FIFO         |
| Stack     | LPUSH + LPOP  | LIFO         |

---

## 📌 End of Day-1 Summary

✅ What Redis is
✅ Why Redis exists
✅ Problems it solves
✅ Redis vs DB
✅ Upstash Redis setup
✅ Strings
✅ Queue
✅ Stack

---
