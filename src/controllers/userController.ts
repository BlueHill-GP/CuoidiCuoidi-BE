import UserInfo from '../models/UserInfo';
import { Request, Response } from 'express';
import { createResponse as response } from '../utils/responseUtils';
import { AuthenticatedRequest } from '../interfaces/request';
import { uploadImage } from '../utils/imageUtils';
import User from '../models/User';

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserInfo.find({ userId: req.params.id })
      .populate(
        'userId',
        ['email', 'avatar', ]
      );
    response(res, 200, true, 'Get user successfully', user[0]);
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};



export const updateAvatar = async (req: AuthenticatedRequest, res: Response) => {

  const files = Array.isArray(req.files.images)
    ? req.files.images
    : [req.files.images];

  try {
    // const results = await Promise.all(files.map(uploadImage));
    const results = await Promise.all(
      files.map((file) => uploadImage(req.userId, file))
    );
    if (!results) {
      return response(res, 500, false, 'Internal Server Error');
    }
    console.log('log id: ', req.userId);

    const userUpdated = await User.findByIdAndUpdate(req.userId, {
    avatar: results[0]
  },{new: true});
  

    return res.status(200).json({
      success: true,
      message: 'Update avatar successfully',
       userUpdated,
    });
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};
