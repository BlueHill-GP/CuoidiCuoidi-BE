"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchServicePackages = exports.getServicePackagesByFilter = exports.getRandomServicePackage = exports.getAllServicePackagesById = exports.getAllServicePackagesByUserId = exports.deleteServicePackage = exports.updateServicePackage = exports.createServicePackage = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const imageUtils_1 = require("../utils/imageUtils");
const servicePackage_1 = __importDefault(require("../models/servicePackage"));
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
const getAllServicePackagesByUserId = async (req, res) => {
    try {
        const servicePackages = await servicePackage_1.default.find({
            user: req.params.id,
        }).populate('user', ['username']);
        (0, responseUtils_1.createResponse)(res, 200, true, 'Get service packages successfully 1', servicePackages);
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.getAllServicePackagesByUserId = getAllServicePackagesByUserId;
const getAllServicePackagesById = async (req, res) => {
    try {
        console.log(req.params.id);
        const servicePackages = await servicePackage_1.default.findById(req.params.id).populate('user', ['username']);
        (0, responseUtils_1.createResponse)(res, 200, true, 'Get service packages successfully', servicePackages);
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.getAllServicePackagesById = getAllServicePackagesById;
const deleteServicePackage = async (req, res) => {
    try {
        const postUpdateCondition = { _id: req.params.id, user: req.userId };
        const servicePackage = await servicePackage_1.default.findById({
            _id: req.params.id,
        });
        await Promise.all(servicePackage.image.map((file) => (0, imageUtils_1.deleteImage)(file)));
        const deletedPost = await servicePackage_1.default.findOneAndDelete(postUpdateCondition);
        if (!deletedPost) {
            return (0, responseUtils_1.createResponse)(res, 500, false, 'User is not authorized or package service is not found');
        }
        (0, responseUtils_1.createResponse)(res, 200, true, 'Service package successfully deleted');
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.deleteServicePackage = deleteServicePackage;
const updateServicePackage = async (req, res) => {
    const { description, image } = req.body;
    if (!description || !image) {
        return res
            .status(400)
            .json({ success: false, message: 'description is required' });
    }
    try {
        let updatePost = {
            description: description,
            image: image,
        };
        const postUpdateCondition = { _id: req.params.id, user: req.userId };
        updatePost = await servicePackage_1.default.findOneAndUpdate(postUpdateCondition, updatePost, {
            new: true,
        });
        if (!updatePost) {
            return (0, responseUtils_1.createResponse)(res, 401, false, 'User is not authorized or package service is not found');
        }
        (0, responseUtils_1.createResponse)(res, 200, true, 'Service package successfully updated', updatePost);
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.updateServicePackage = updateServicePackage;
const createServicePackage = async (req, res) => {
    const { title, description, price, location } = req.body;
    const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
    try {
        const results = await Promise.all(files.map((file) => (0, imageUtils_1.uploadImage)(req.userId, file)));
        if (!results) {
            return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
        }
        console.log('log id: ', req.userId);
        const newServicePackage = new servicePackage_1.default({
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
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.createServicePackage = createServicePackage;
const getRandomServicePackage = async (req, res) => {
    try {
        // const servicePackages = await ServicePackage.aggregate([
        //   { $sample: { size: 5 } },
        // ]).populate('user', ['username']);
        const servicePackages = await servicePackage_1.default.aggregate([
            { $sample: { size: 5 } },
        ]).exec();
        await servicePackage_1.default.populate(servicePackages, {
            path: 'user',
            select: 'username',
        });
        (0, responseUtils_1.createResponse)(res, 200, true, 'ok', servicePackages);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getRandomServicePackage = getRandomServicePackage;
const getServicePackagesByFilter = async (req, res) => {
    const { filter } = req.body;
    console.log(filter);
    try {
        // Find all the service packages with the given location
        const servicePackages = await servicePackage_1.default.find({
            location: filter.selectedLocation,
        });
        // Return the filtered service packages
        res.json(servicePackages);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
exports.getServicePackagesByFilter = getServicePackagesByFilter;
const searchServicePackages = async (req, res) => {
    const { title, user, price } = req.query;
    const filters = { title, user, price, location };
    if (title)
        filters.title = { $regex: title, $options: 'i' };
    if (user)
        filters.user = user;
    if (price)
        filters.price = price;
    if (location)
        filters.location = { $regex: location, $options: 'i' };
    try {
        const servicePackages = await servicePackage_1.default.find(filters).populate('user');
        res.json(servicePackages);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
exports.searchServicePackages = searchServicePackages;
//# sourceMappingURL=servicePackageController.js.map