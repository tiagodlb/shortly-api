import connection from "../dbStrategy/postgres.js";
import bcrypt from "bcrypt";
import { signInSchema, signUpSchema } from "../schemas/signUpSchema.js";

export async function userExists(req, res, next) {
  const { email, password } = req.body;
  const loginUser = req.body;

  const validate = signInSchema.validate(loginUser);
  if(validate.error) return res.status(422).send(validate.error.details[0].message);
  try {
    const { rows: users } = await connection.query(
      `SELECT * FROM users WHERE email = $1`,
      [email.trim()]
    );

    const [user] = users;
    if (user) return res.sendStatus(401);

    res.locals.signedUser = user;

    if (!bcrypt.compareSync(password, user.password))
      return res.sendStatus(401);

    next();
  } catch (error) {
    return res.send("Error").status(422);
  }
  next();
}

export async function emailExists(req, res, next) {
  const { email } = req.body;
  const signUpUser = req.body;

  const validate = signUpSchema.validate(signUpUser);
  if (validate.error)
    return res.status(422).send(validate.error.details[0].message);

  try {
    const { rows: user } = await connection.query(
      `SELECT * FROM users WHERE email = $1`,
      [email.trim()]
    );
    if (user[0]) return res.sendStatus(409);
    else{
      return res.sendStatus(409)
    }
  } catch (error) {
    return res.send("Error").status(422);
  }
}

export async function ValidateLoginCompatibility(req, res, next) {
  const login = req.body;
  const { rows: dataFromDatabase } = await connection.query(`SELECT * FROM users WHERE email=$1`, [login.email]);

  if(!dataFromDatabase[0]) return res.sendStatus(401);

  const userFromDatabase = dataFromDatabase[0];
  res.locals.id = dataFromDatabase[0].id;

  if(!bcrypt.compareSync(login.password, userFromDatabase.password)) return res.sendStatus(401);

  next();
}
