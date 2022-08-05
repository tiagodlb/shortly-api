import joi from "joi";

export const userSchema = joi.object({
    name: joi.string().required().length(100),
    email: joi.string().required().length(150),
    password: joi.string().required().length(100),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
})