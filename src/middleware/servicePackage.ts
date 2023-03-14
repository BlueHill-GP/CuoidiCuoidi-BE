import { NextFunction, Response } from 'express';
import { AuthenticatedRequest, bookingRequest } from '../interfaces/request';
import ServicePackage from '../models/servicePackage';
import { createResponse as response } from '../utils/responseUtils';
import { ObjectId } from 'mongodb';

export const verifyPackageService = async (
  req: bookingRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { serviceId } = req.body;
    console.log(serviceId);
    
    if (!ObjectId.isValid(serviceId)) {
      return response(res, 404, false, 'Package service not found 1');
    }
      const servicePackage = await ServicePackage.findById(serviceId);
    if (servicePackage) {
      console.log('owner ', servicePackage.user);
      let owenService = servicePackage.user;
      req.body.owenService = owenService;
      console.log("boody:",req.body);
      
      next();
    } else {
      return response(res, 404, false, 'Package service not found');
    }
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};

