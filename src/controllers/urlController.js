import { v4 as uuid } from "uuid";
import { nanoid } from "nanoid";
import connection from "../dbStrategy/postgres.js";

export async function postShortUrl(req, res) {
  const { url } = req.body;
  const { user } = res.locals;

  const cleanUrl = url.trim();
  const shortCleanUrl = nanoid(8);
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer", "");

  try {
    const userExists = await connection.query(
      `
        SELECT "userId" FROM sessions WHERE token = $1
        `,
      [token]
    );
    if (userExists.rowCount) return res.sendStatus(404);
    const shortUrl = await connection.query(
      `
            INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1,$2,$3)
        `,
      [cleanUrl, shortCleanUrl, user.id]
    );
    await connection.query(
      `
        UPDATE users SET
        "linksCount" = "linksCount" + 1
        WHERE id=$1`,
      [user.id]
    );
    return res.status(201).send({ shortUrl });
  } catch (error) {
    return res.send("Error when you're shorting a link").status(500);
  }
}

export async function getUrlId(req, res) {
  try {
    const shortUrl = res.locals.shortUrl;

    res.status(200).send(shortUrl);
  } catch (error) {
    return res.send("Error when you're getting a short url").status(500);
  }
}

export async function getOpenUrl(req, res) {
  try {
    const url = res.locals.url;
    const id = res.locals.id;
    const newCount = res.locals.visitsCount + 1;

    await connection.query(
      `
        UPDATE urls SET "visitsCount"=$1 WHERE id=$2
        `[(newCount, id)]
    );
    res.redirect(url);
  } catch (error) {
    return res.send("Error when you're opening a url").status(500);
  }
}

export async function deleteUrl(req, res) {
  const id = parseInt(req.params.id);
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer", "");

  try {
    await connection.query(`DELETE FROM urls WHERE id=$1`, [id]);

    res.sendStatus(204);
  } catch (error) {
    return res.send("Error when you're deleting a url").status(500);
  }
}
