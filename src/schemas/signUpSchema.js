import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().required().length(100),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(new RegExp(/[a-zA-Z0-9!@#$%^&*()\-__+.]{11,}/))
    .required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp(/[a-zA-Z0-9!@#$%^&*()\-__+.]{11,}/))
      .required(),
  });
  
