import { Router } from "express";

const userRouter = Router()

userRouter.get("/users/me")

export default userRouter;