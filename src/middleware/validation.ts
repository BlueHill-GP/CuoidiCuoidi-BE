import { Request, Response } from 'express';
import { createResponse as response } from '../utils/response';
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

export const checkImage = (req: Request, res: Response, next: any) => {
  // console.log("hii    :",req.body);
  // console.log('hii    :', req.params);
  // console.log('hii    :', req);
  
  const files = Array.isArray(req.files.images)
    ? req.files.images
    : [req.files.images];
console.log(files);

  if (files.length === 0) {
    return response(res, 400, false, 'Please upload a file');
  }
  files.map((file: any) => {
    if (!file.mimetype.startsWith('image')) {
      return response(res, 400, false, 'Please upload an image');
    }
  })
  next();
};
