import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routers/auth.routers.js"
import urlRouter from "./routers/urls.routers.js"
import userRouter from "./routers/users.routers.js"
import rankingRouter from "./routers/ranking.routers.js"

dotenv.config()
const server = express()
server.use(cors())
server.use(express.json())

server.use([authRouter, urlRouter, userRouter, rankingRouter])

server.listen(process.env.PORT, () => {
    console.log("Servidor rodando na porta " + process.env.PORT)
})