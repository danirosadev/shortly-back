import db from "../config/database.connection.js";
import { nanoid } from "nanoid";

export async function shortUrl(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) return res.sendStatus(401)

    const { url } = req.body
    const shortUrl =  nanoid()

    try {
        await db.query(`INSERT INTO url (short_url, url, user_id) VALUES ($1,$2,$3)`, [shortUrl, url, sessions.rows[0].user_id])

        const urlId = await db.query(`SELECT * FROM url WHERE "short"=$1`,[shortUrl])

        res.status(201).send({
            id: urlId.rows[0].id,
            shortUrl: shortUrl
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getUrl(req,res){
    const { id } = req.params

    try {
        let isUrl = await db.query(`SELECT * FROM urls WHERE id = $1`,[id])
        if(isUrl.rows.length === 0) return res.sendStatus(404)

        isUrl = isUrl.rows[0]

        const urlObj = {
            id:isUrl.id,
            short_url:isUrl.short_url,
            url:isUrl.url
        }

        res.status(200).send(urlObj)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function openShortUrl(req,res){
    const { shortUrl } = req.params

    try {
        let isShortUrl = await db.query(`SELECT * FROM urls WHERE short_url = $1`, [shortUrl])
        if(isShortUrl.rows.length === 0) return res.sendStatus(404)

        isShortUrl = isShortUrl.rows[0]

        let clicks = isShortUrl.clicks
        clicks = clicks + 1
        await db.query(`UPDATE user_urls SET clicks = $1 WHERE short_url = $2`, [clicks, shortUrl])

        res.redirect(`${isShortUrl.url}`)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function deleteShortUrl(req, res){
    const { id } = req.params

    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) return res.sendStatus(401)

    try {
        const isSession = await db.query(`SELECT * FROM sessions WHERE token = $1`,[token])

        const isUser = await db.query(`SELECT * FROM urls WHERE id = $1`,[id])
        if (isUser.rows.length === 0) return res.sendStatus(404)

        if(isSession.rows[0].user_id !== isUser.rows[0].user_id) return res.sendStatus(401)
        await db.query(`DELETE FROM urls WHERE id = $1`,[id])

        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error.message)
    }
}