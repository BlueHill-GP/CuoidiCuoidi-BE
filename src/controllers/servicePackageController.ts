import { Router, Request, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/request';

import { createResponse as response } from '../utils/responseUtils';
import { deleteImage, uploadImage } from '../utils/imageUtils';
import ServicePackage, { IServicePackage } from '../models/servicePackage';

// const getServicePackages = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const servicePackages = await ServicePackage.find({
//       user: req.userId,
//     }).populate('user', ['username']);
//     response(
//       res,
//       200,
//       true,
//       'Get service packages successfully',
//       servicePackages
//     );
//   } catch (error) {
//     console.log(error);
//     return response(res, 500, false, 'Internal Server Error');
//   }
// };

const getAllServicePackagesByUserId = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const servicePackages = await ServicePackage.find({
      user: req.params.id,
    }).populate('user', ['username']);
    response(
      res,
      200,
      true,
      'Get service packages successfully 1',
      servicePackages
    );
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};

const getAllServicePackagesById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    console.log(req.params.id);
    
    const servicePackages = await ServicePackage.findById(
     req.params.id,
    )
      .populate('user', ['username']);
    response(
      res,
      200,
      true,
      'Get service packages successfully',
      servicePackages
    );
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};

const deleteServicePackage = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    const servicePackage = await ServicePackage.findById({
      _id: req.params.id,
    });
    await Promise.all(servicePackage.image.map((file) => deleteImage(file)));
    const deletedPost = await ServicePackage.findOneAndDelete(
      postUpdateCondition
    );

    if (!deletedPost) {
      return response(
        res,
        500,
        false,
        'User is not authorized or package service is not found'
      );
    }
    response(res, 200, true, 'Service package successfully deleted');
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};

const updateServicePackage = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { description, image } = req.body;
  if (!description || !image) {
    return res
      .status(400)
      .json({ success: false, message: 'description is required' });
  }

  try {
    let updatePost: any = {
      description: description,
      image: image,
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatePost = await ServicePackage.findOneAndUpdate(
      postUpdateCondition,
      updatePost,
      {
        new: true,
      }
    );

    if (!updatePost) {
      return response(
        res,
        401,
        false,
        'User is not authorized or package service is not found'
      );
    }

    response(
      res,
      200,
      true,
      'Service package successfully updated',
      updatePost
    );
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};

const createServicePackage = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { title, description, price,location } = req.body;

  const files = Array.isArray(req.files.images)
    ? req.files.images
    : [req.files.images];

  try {
    const results = await Promise.all(
      files.map((file) => uploadImage(req.userId, file))
    );
    if (!results) {
      return response(res, 500, false, 'Internal Server Error');
    }
    console.log('log id: ', req.userId);

    const newServicePackage: IServicePackage = new ServicePackage({
      title: title,
      description: description,
      price: price,
      image: results,
      location: location,
      user: req.userId,
    });
    await newServicePackage.save();
    return res.status(200).json({
      success: true,
      message: 'Post created successfully',
      newServicePackage,
    });
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};

const getRandomServicePackage = async (req: Request, res: Response) => {
  try {
    // const servicePackages = await ServicePackage.aggregate([
    //   { $sample: { size: 5 } },
    // ]).populate('user', ['username']);
    const servicePackages = await ServicePackage.aggregate([
      { $sample: { size: 5 } },
    ]).exec();

    await ServicePackage.populate(servicePackages, {
      path: 'user',
      select: 'username',
    });
    response(res, 200, true, 'ok', servicePackages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
  
const getServicePackagesByFilter = async (req: Request, res: Response) => { 
  const { filter } = req.body
  console.log(filter);
  

    try {
      // Find all the service packages with the given location
      const servicePackages = await ServicePackage.find({ location: filter.selectedLocation });

      // Return the filtered service packages
      res.json(servicePackages);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
}

export {
  createServicePackage,
  updateServicePackage,
  deleteServicePackage,
  getAllServicePackagesByUserId,
  getAllServicePackagesById,
  getRandomServicePackage,
  getServicePackagesByFilter,
};
