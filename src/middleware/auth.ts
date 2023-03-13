import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import OtpRedis from '../repositories/OtpRedisRepository';
import { createResponse as response } from '../utils/responseUtils';
import { getBackOtpSchema } from '../validation/userValidationSchema';
import User from '../models/User';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Access token not found' });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, message: 'Invalid access token' });
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp, email } = req.body;
    await OtpRedis.get(email, (err, reply) => {
      if (reply === otp) {
        next();
      } else {
        return response(res, 400, false, 'Invalid OTP');
      }
    });
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal server error');
  }
};

export const userGetBackOtp = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const validation = getBackOtpSchema.validate(req.body);

    if (validation.error) {
      return res.status(400).json({
        errors: validation.error.details[0].path[0] + ' is not a valid',
      });
    }
   const { email } = req.body;
   await OtpRedis.get(email, (err, reply) => {
     if (reply) {
       next();
     } else {
       return response(res, 400, false, 'Invalid OTP');
     }
   });
 } catch (error) {
   console.log(error);
   return response(res, 500, false, 'Internal server error');
 }
};


export const verifyTypeUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.userId); 
    if (
      user &&
      (user.userType === 'photographer' || user.userType === 'makeup' )
    ) {
      next();
    } else {
      response(res, 400, false, 'You are not our partner');
    };
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal server error');
  }
};