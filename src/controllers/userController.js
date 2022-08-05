import connection from "../dbStrategy/postgres.js";

export async function postSignUp(req, res) {
  const { name, email, password } = req.body;
  try {
    const { rows: id } = await connection.query(
      `SELECT id FROM users WHERE email=$1`,
      [email]
    );
    if (id.length) return res.sendStatus(409);
    await connection.query(
      `INSERT INTO users (name,email,password) VALUES($1,$2,$3,)`,
      [name, email, password]
    );
    res.sendStatus(201);
  } catch (error) {
    return res.stauts(500).send("Error posting user");
  }
}
