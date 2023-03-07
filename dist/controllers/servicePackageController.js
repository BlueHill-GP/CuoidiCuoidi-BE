"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServicePackages = exports.deleteServicePackage = exports.updateServicePackage = exports.createServicePackage = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const imageUtils_1 = require("../utils/imageUtils");
const servicePackage_1 = __importDefault(require("../models/servicePackage"));
const getServicePackages = async (req, res) => {
    try {
        const servicePackages = await servicePackage_1.default.find({
            user: req.userId,
        }).populate('user', ['username']);
        (0, responseUtils_1.createResponse)(res, 200, true, 'Get service packages successfully', servicePackages);
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.getServicePackages = getServicePackages;
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
    const { title, description, price } = req.body;
    const userIP = req.socket.remoteAddress;
    console.log('userIb: 34234: ', userIP);
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
//# sourceMappingURL=servicePackageController.js.map