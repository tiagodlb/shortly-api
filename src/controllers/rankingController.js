import connection from "../dbStrategy/postgres.js";

export async function getRanking(req, res) {
  try {
    const { rows: ranking } = await connection.query(`
        SELECT
        users.id,
        users.name,
        COUNT("userId") AS "linksCount",
        COALESCE(SUM(urls."visitsCount"), 0)
    FROM
        users
        LEFT JOIN
            urls
            ON urls."userId" = users.id
    GROUP BY
        users.id
    ORDER BY
        "visitsCount" DESC
    LIMIT 10
        `);

    return res.send(ranking).status(200);
  } catch (error) {
    return res.send("Error when you're getting the ranking").status(500);
  }
}
