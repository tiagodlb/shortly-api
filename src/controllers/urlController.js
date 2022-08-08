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
