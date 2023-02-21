import { Router } from "express";

const urlRouter = Router()

urlRouter.post("/urls/shorten")
urlRouter.get("/urls/:id")
urlRouter.get("/urls/open/:shortUrl")
urlRouter.delete("/urls/:id")

export default urlRouter;