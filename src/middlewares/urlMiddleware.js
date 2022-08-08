import connection from "../dbStrategy/postgres.js";
import { urlSchema } from "../schemas/urlSchema.js";

export async function urlExists(req, res, next) {
  const { id } = req.params;

  try {
    const { rows: urls } = await connection.query(
      `SELECT * FROM urls WHERE id = $1`,
      [id]
    );
    if (!urls[0]) return res.sendStatus(404);
    const [url] = urls;
    res.locals.url = url;

    next();
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function ValidateUrlBelongsToUser(req, res, next) {
    try {
        const userId = res.locals.userId;
        const urlId = parseInt(req.params.id);

        const { rows: infoRows } = await connection.query(`
            SELECT * FROM urls WHERE "userId"=$1 AND id=$2
            `, [userId, urlId]);

        if(!infoRows[0]) return res.sendStatus(401);
        next();

    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function ValidateShortUrl(req, res, next) {
    try {
        const { shortUrl } = req.params;

        const { rows: urlRows } = await connection.query(`SELECT id, url, "visitsCount"
        FROM urls
        WHERE "shortUrl"=$1`, [shortUrl]);

        if (!urlRows[0]) return res.sendStatus(404);

        const { id, url: bigUrl, visitsCount } = urlRows[0];
        res.locals.id = id;
        res.locals.bigUrl = bigUrl;
        res.locals.visitsCount = visitsCount;

        next()
    } catch (error) {
        return res.sendStatus(500);
    }
}

export function ValidateUrlEntrance(req, res, next) {
    const urlObject = req.body;
    const validation = urlSchema.validate(urlObject);

    if(validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    }

    if(!urlObject.url.startsWith("https://")) return res.status(422).send('Invalid url format');

    next();
}