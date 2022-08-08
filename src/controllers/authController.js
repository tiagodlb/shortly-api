import bcrypt from "bcrypt";
import { stripHtml } from "string-strip-html";
import { v4 as uuid } from "uuid";
import connection from "../dbStrategy/postgres.js";

export async function postSignUp(req, res) {
  const { name, email, password } = req.body;

  const cleanEmail = stripHtml(email).result.trim();
  const cleanName = stripHtml(name).result.trim();
  
  try {
    const { rows: id } = await connection.query(
      `SELECT id FROM users WHERE email=$1`,
      [email]
    );

    const passwordHash = bcrypt.hashSync(password, 30);

    if (id.length) return res.sendStatus(409);
    await connection.query(
      `INSERT INTO users (name,email,password) VALUES($1,$2,$3,)`,
      [cleanName, cleanEmail, passwordHash]
    );
    res.sendStatus(201);
  } catch (error) {
    return res.stauts(500).send("Error posting user");
  }
}

export async function postSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const { rows: users } = await connection.query(
      `SELECT * FROM users WHERE email=$1`,
      [email]
    );
    const [user] = users;
    if (!user) return res.sendStatus(401);
    if (bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await connection.query(
        `INSERT INTO sessions (token,"userId") VALUES($1,$2)`,
        [token, user.id]
      );
      return res.send(token).status(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    return res.send("Error when you're loggin in").status(500);
  }
}
