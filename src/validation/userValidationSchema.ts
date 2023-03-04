import Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string()
  .trim()
    .pattern(/^[^0-9]+$/)
    .pattern(/^\S.*\S$/)
    .replace(/[\s]+/g, ' ')
    .strict()
    .min(3)
    .regex(/^.*\S*.*$/)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])/)
    .pattern(/^(?=.*\d)/)
    .pattern(/^(?=.*[!@#$%^&*])/)
    .trim()
    .strict()
    .min(6)
    .required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^0\d{9}$/)
    .required(),
});

export const loginSchema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(/^[^0-9]+$/)
    .pattern(/^\S.*\S$/)
    .replace(/[\s]+/g, ' ')
    .strict()
    .min(3)
    .regex(/^.*\S*.*$/)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])/)
    .pattern(/^(?=.*\d)/)
    .pattern(/^(?=.*[!@#$%^&*])/)
    .trim()
    .strict()
    .min(6)
    .required(),
});
