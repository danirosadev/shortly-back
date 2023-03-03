import { Router } from "express";
import { getUrl, openShortUrl, shortUrl } from "../controllers/urls.controllers.js";

const urlRouter = Router()

urlRouter.post("/urls/shorten", shortUrl)
urlRouter.get("/urls/:id", getUrl)
urlRouter.get("/urls/open/:shortUrl", openShortUrl)
urlRouter.delete("/urls/:id")

export default urlRouter;