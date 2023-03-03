import db from "../config/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid"

export async function signUp (req, res){
    const { name, email, password } = req.body
    const hashPassword = bcrypt.hashSync(password, 10)

    try {
        const isEmail = await db.query(`SELECT * FROM users WHERE email = '${email}'`)
        if (isEmail.rowCount > 0) return res.sendStatus(409)
         
        await db.query(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${hashPassword}')`)
        return res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function signIn (req, res) {
    const { email, password } = req.body
    console.log(req.body)

    try {
        const isUser = await db.query(`SELECT * FROM users WHERE email = '${email}'`)
        if (isUser.rowCount === 0) return res.sendStatus(401)

        const { id, password:hash } = isUser.rows[0]
        const isPassword = bcrypt.compareSync(password, hash)
        if (!isPassword) return res.sendStatus(422)

        const token = uuidV4()
        await db.query(`INSERT INTO sessions (token, user_id) VALUES ($1, $2)`, [token, existe.rows[0].id])
        return res.status(200).send( { token:token })
    } catch (error) {
        res.status(500).send(error.message)
    }
}