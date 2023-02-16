import { Request, Response } from 'express';
import { userSchema } from '../validation/userValidationSchema';

export const userValidation = (req: Request, res: Response, next: any) => {
  const validation = userSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details[0].path[0] + ' is not a valid',
    });
  }

  next();
};
