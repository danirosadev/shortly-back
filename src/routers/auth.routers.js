import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { schemaValid} from "../middlewares/validateAuth.js";
import { signUpSchema } from "../schemas/authSchemas.js";

const authRouter = Router()

authRouter.post("/signup", schemaValid(signUpSchema), signUp)
authRouter.post("/signin", signIn)

export default authRouter;