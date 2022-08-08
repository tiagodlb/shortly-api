import connection from "../dbStrategy/postgres.js";

export async function ValidateSession(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization.startsWith("Bearer")) return res.sendStatus(401);
        const token = authorization?.replace("Bearer ", "");

        const { rows: sessionRows } = await connection.query(`SELECT "userId" FROM "currentSessions" WHERE token=$1`, [token]);

        if (!sessionRows[0]) return res.sendStatus(401);
        const userId = sessionRows[0].userId;

        console.log(userId);
        res.locals.userId = parseInt(userId);

        next()

    } catch (error) {
        console.error(error);
    };
}