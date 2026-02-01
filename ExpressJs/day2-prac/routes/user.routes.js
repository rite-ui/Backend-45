import { Router } from "express";
import { getAllUser } from "../controllers/user.conroller.js";

const userRouter = Router();

userRouter.get("/get-all-user",getAllUser);

export default userRouter;