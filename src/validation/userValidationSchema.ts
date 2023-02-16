import Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[^0-9]+$/)
    .min(3)
    .max(30)
    .required(),
  //   email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])/)
    .pattern(/^(?=.*\d)/)
    .pattern(/^(?=.*[!@#$%^&*])/)
    .min(6)
    .required(),
});
