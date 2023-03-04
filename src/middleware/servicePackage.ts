import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/request';
import ServicePackage from '../models/servicePackage';
import { createResponse as response } from '../utils/response';

export const verifyPackageService = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { serviceId } = req.body;
    const servicePackage = await ServicePackage.findById(serviceId);
    if (servicePackage) {
      next();
    } else {
      return response(res, 404, false, 'Package service not found');
    }
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};
