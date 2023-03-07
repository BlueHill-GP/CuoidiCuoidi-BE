import { Request, Response } from 'express';
import User from '../models/User';
import { createResponse as response } from '../utils/responseUtils';
import {
  loginSchema,
  registerSchema,
} from '../validation/userValidationSchema';

export const userRegisterValidation = async(
  req: Request,
  res: Response,
  next: any
) => {
  let {email, phone}= req.body;
  const validation = registerSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details[0].path[0] + ' is not a valid',
    });
  }
  try {
     email = await User.findOne({ email });
  phone = await User.findOne({ phone });
  if (email || phone) {
      return response(res, 400, false, 'email or phone already exists');
    }
  next();
  } catch (error) {
    console.log(error);
    return response(res, 500, false,'Internal server error');
  }
 
};

export const userLoginValidation = (req: Request, res: Response, next: any) => {
  const validation = loginSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details[0].path[0] + ' is not a valid',
    });
  }

  next();
};

export const checkImage = (req: Request, res: Response, next: any) => {
  const files = Array.isArray(req.files.images)
    ? req.files.images
    : [req.files.images];

  if (files.length === 0) {
    return response(res, 400, false, 'Please upload a file');
  }
  files.map((file: any) => {
    if (!file.mimetype.startsWith('image')) {
      return response(res, 400, false, 'Please upload an image');
    }
  });
  next();
};
