import UserInfo from '../models/UserInfo';
import { Request, Response } from 'express';
import { createResponse as response } from '../utils/responseUtils';

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserInfo.find({ userId: req.params.id })
      .populate(
        'userId',
        ['email']
      );
    response(res, 200, true, 'Get user successfully', user[0]);
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};
