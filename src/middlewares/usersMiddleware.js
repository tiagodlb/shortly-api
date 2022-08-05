import { userSchema } from "../schemas/userSchema.js";

export function ValidateUser(req, res, next) {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(422).send(error.details.map((detail) => detail.message));
    return;
  }

  next();
}
